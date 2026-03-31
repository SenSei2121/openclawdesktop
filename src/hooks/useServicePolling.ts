import { useState, useEffect, useCallback, useRef } from 'react';
import { isDesktop } from '../api/bridge';
import * as svc from '../api/service';
import type { ServiceStatus } from '../types';

const POLL_MS = 5_000;

export function useServicePolling() {
  const [status, setStatus] = useState<ServiceStatus | null>(null);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const refresh = useCallback(async () => {
    if (!isDesktop()) return;
    try {
      setStatus(await svc.status());
    } catch {
      setStatus(null);
    }
  }, []);

  useEffect(() => {
    refresh();
    timer.current = setInterval(refresh, POLL_MS);
    return () => clearInterval(timer.current);
  }, [refresh]);

  return { status, refresh };
}
