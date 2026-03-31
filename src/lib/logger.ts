/**
 * Structured logging system for OpenClaw Desktop.
 *
 * Architecture: Ring-buffer store + typed log entries + subscriber pattern.
 * Each log entry is a structured record rather than a formatted string.
 */

// ─── Types ──────────────────────────────────────────────────────
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: number;
  ts: Date;
  level: LogLevel;
  scope: string;
  msg: string;
  data: unknown[];
  // Backward-compat aliases used by Logs component
  timestamp: Date;
  module: string;
  message: string;
  args: unknown[];
}

type Subscriber = (entry: LogEntry) => void;

const LEVEL_WEIGHT: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 };

// ─── Ring Buffer Store ──────────────────────────────────────────
class RingBuffer {
  private buf: LogEntry[] = [];
  private cap: number;
  private seq = 0;
  private subs = new Set<Subscriber>();

  constructor(capacity = 500) {
    this.cap = capacity;
  }

  push(entry: Omit<LogEntry, 'id' | 'timestamp' | 'module' | 'message' | 'args'>): LogEntry {
    const record: LogEntry = { ...entry, id: ++this.seq, timestamp: entry.ts, module: entry.scope, message: entry.msg, args: entry.data };
    this.buf.push(record);
    if (this.buf.length > this.cap) this.buf.shift();
    this.subs.forEach(fn => fn(record));
    return record;
  }

  entries(): LogEntry[] { return [...this.buf]; }
  flush(): void {
    this.buf = [];
    const now = new Date();
    this.subs.forEach(fn => fn({ id: 0, ts: now, level: 'info', scope: 'system', msg: 'Logs cleared', data: [], timestamp: now, module: 'system', message: 'Logs cleared', args: [] }));
  }
  subscribe(fn: Subscriber): () => void { this.subs.add(fn); return () => this.subs.delete(fn); }
}

export const store = new RingBuffer();

// ─── Threshold ──────────────────────────────────────────────────
function threshold(): LogLevel {
  try {
    const saved = localStorage.getItem('LOG_LEVEL') as LogLevel;
    if (saved && LEVEL_WEIGHT[saved] !== undefined) return saved;
  } catch { /* SSR-safe */ }
  return 'debug';
}

// ─── Console Formatting ─────────────────────────────────────────
const LEVEL_STYLE: Record<LogLevel, string> = {
  debug: 'color:#999',
  info:  'color:#10b981;font-weight:600',
  warn:  'color:#f59e0b;font-weight:600',
  error: 'color:#ef4444;font-weight:600',
};

function stamp(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}.${String(d.getMilliseconds()).padStart(3, '0')}`;
}

function emit(level: LogLevel, scope: string, msg: string, data: unknown[]): void {
  if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[threshold()]) return;

  const ts = new Date();
  const tag = `%c${stamp()} %c[${scope}] %c${msg}`;
  const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
  console[method](tag, 'color:#999', 'color:#7c3aed;font-weight:600', LEVEL_STYLE[level], ...data);

  store.push({ ts, level, scope, msg, data });
}

// ─── Logger Factory ─────────────────────────────────────────────
export interface Logger {
  debug(msg: string, ...data: unknown[]): void;
  info(msg: string, ...data: unknown[]): void;
  warn(msg: string, ...data: unknown[]): void;
  error(msg: string, ...data: unknown[]): void;
  /** Log a user action */
  action(action: string, ...data: unknown[]): void;
  /** Log a state transition */
  state(description: string, state: unknown): void;
  /** Log an API call */
  apiCall(method: string, ...data: unknown[]): void;
  /** Log an API response */
  apiResponse(method: string, result: unknown): void;
  /** Log an API error */
  apiError(method: string, error: unknown): void;
}

export function createLogger(scope: string): Logger {
  return {
    debug:       (msg, ...data) => emit('debug', scope, msg, data),
    info:        (msg, ...data) => emit('info',  scope, msg, data),
    warn:        (msg, ...data) => emit('warn',  scope, msg, data),
    error:       (msg, ...data) => emit('error', scope, msg, data),
    action:      (action, ...data) => emit('info', scope, `⚡ ${action}`, data),
    state:       (desc, state) => emit('debug', scope, `◆ ${desc}`, [state]),
    apiCall:     (method, ...data) => emit('debug', scope, `→ ${method}`, data),
    apiResponse: (method, result) => emit('debug', scope, `← ${method}`, [result]),
    apiError:    (method, error) => emit('error', scope, `✕ ${method}`, [error]),
  };
}

// ─── Convenience loggers ────────────────────────────────────────
export const appLogger       = createLogger('app');
export const serviceLogger   = createLogger('service');
export const configLogger    = createLogger('config');
export const aiLogger        = createLogger('ai');
export const channelLogger   = createLogger('channel');
export const setupLogger     = createLogger('setup');
export const dashboardLogger = createLogger('dashboard');
export const testingLogger   = createLogger('testing');
export const apiLogger       = createLogger('api');

// Expose helpers to the console in dev
if (typeof window !== 'undefined') {
  const w = window as unknown as Record<string, unknown>;
  w.setLogLevel = (level: LogLevel) => { localStorage.setItem('LOG_LEVEL', level); console.log(`Log level → ${level}`); };
  w.logStore = store;
}

// Re-export for backward compat
export const logStore = {
  getAll: () => store.entries(),
  clear:  () => store.flush(),
  subscribe: (fn: () => void) => store.subscribe(() => fn()),
  add: () => { /* noop — store.push used internally */ },
};
