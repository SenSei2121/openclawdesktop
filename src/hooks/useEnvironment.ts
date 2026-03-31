import { useState, useEffect } from 'react';
import { isDesktop } from '../api/bridge';
import { call } from '../api/bridge';

interface EnvStatus {
  os: string;
  node_installed: boolean;
  node_version: string | null;
  node_version_ok: boolean;
  openclaw_installed: boolean;
  openclaw_version: string | null;
}

export function useEnvironment() {
  const [env, setEnv] = useState<EnvStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isDesktop()) { setLoading(false); return; }

    (async () => {
      try {
        const result = await call<EnvStatus>('check_environment');
        setEnv(result);
      } catch {
        setEnv(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const allReady = env != null && env.node_installed && env.node_version_ok && env.openclaw_installed;

  return { env, loading, allReady };
}
