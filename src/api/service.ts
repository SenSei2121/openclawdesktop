import { call } from './bridge';
import type { ServiceStatus } from '../types';

export const status  = ()              => call<ServiceStatus>('get_service_status');
export const start   = ()              => call<string>('start_service');
export const stop    = ()              => call<string>('stop_service');
export const restart = ()              => call<string>('restart_service');
export const logs    = (lines?: number) => call<string[]>('get_logs', { lines });
