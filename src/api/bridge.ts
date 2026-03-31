/**
 * Tauri IPC bridge — thin wrapper around invoke() with logging.
 * All domain API modules import `call` from here instead of using invoke directly.
 */
import { invoke } from '@tauri-apps/api/core';

/** True when running inside a Tauri webview. */
export const isDesktop = (): boolean =>
  typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

/**
 * Call a Tauri command with automatic logging.
 * Throws if not in a Tauri context.
 */
export async function call<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (!isDesktop()) {
    throw new Error('Desktop runtime required — launch via the Tauri application.');
  }

  if (import.meta.env.DEV) {
    console.debug(`[ipc] → ${cmd}`, args ?? '');
  }

  try {
    const result = await invoke<T>(cmd, args);
    if (import.meta.env.DEV) {
      console.debug(`[ipc] ← ${cmd}`, result);
    }
    return result;
  } catch (err) {
    console.error(`[ipc] ✕ ${cmd}`, err);
    throw err;
  }
}
