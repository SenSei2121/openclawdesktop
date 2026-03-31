import { call } from './bridge';
import type { SystemInfo } from '../types';

export const info              = ()                => call<SystemInfo>('get_system_info');
export const isInstalled       = ()                => call<boolean>('check_openclaw_installed');
export const version           = ()                => call<string | null>('get_openclaw_version');
export const isOllamaInstalled = ()                => call<boolean>('check_ollama_installed');
export const ollamaModels      = ()                => call<string[]>('get_ollama_models');
export const installOllamaModel = (modelName: string) => call<string>('install_ollama_model', { modelName });
