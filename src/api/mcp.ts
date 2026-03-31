import { call } from './bridge';
import type { MCPConfig } from '../types';

export const list           = ()                                  => call<Record<string, MCPConfig>>('get_mcp_config');
export const save           = (name: string, cfg: MCPConfig | null) => call<string>('save_mcp_config', { name, config: cfg });
export const installFromGit = (url: string)                       => call<string>('install_mcp_from_git', { url });
export const uninstall      = (name: string)                      => call<string>('uninstall_mcp', { name });
export const installPlugin  = (url: string)                       => call<string>('install_mcp_plugin', { url });
export const test           = (serverType: string, target: string, command?: string, args?: string[]) =>
  call<string>('test_mcp_server', { serverType, target, command: command ?? null, args: args ?? null });

// mcporter helpers
export const isMcporterInstalled = () => call<boolean>('check_mcporter_installed');
export const installMcporter     = () => call<string>('install_mcporter');
export const uninstallMcporter   = () => call<string>('uninstall_mcporter');

export const configSet = (key: string, value: string) => call<string>('openclaw_config_set', { key, value });
