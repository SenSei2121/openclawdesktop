/**
 * Domain-organised API surface for OpenClaw Desktop.
 *
 * Usage:
 *   import { service, ai, mcp } from '@/api';
 *   const status = await service.status();
 */
export { isDesktop } from './bridge';
export * as service from './service';
export * as system from './system';
export * as ai from './ai';
export * as channels from './channels';
export * as mcp from './mcp';
export * as skills from './skills';
export * as diagnostics from './diagnostics';
export * as config from './config';
