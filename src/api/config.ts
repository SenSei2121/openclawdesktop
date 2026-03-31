import { call } from './bridge';
import type { PdfConfig, MemoryConfig } from '../types';

// General config
export const load    = ()                                  => call<unknown>('get_config');
export const save    = (config: unknown)                   => call<string>('save_config', { config });
export const getEnv  = (key: string)                       => call<string | null>('get_env_value', { key });
export const setEnv  = (key: string, value: string)        => call<string>('save_env_value', { key, value });
export const validate = (configJson: string)               => call<string>('validate_openclaw_config', { configJson });

// Tools profile
export const toolsProfile     = ()                         => call<string>('get_tools_profile');
export const saveToolsProfile = (profile: string)          => call<string>('save_tools_profile', { profile });

// PDF
export const pdfConfig     = ()                            => call<PdfConfig>('get_pdf_config');
export const savePdfConfig = (pdfConfig: PdfConfig)        => call<string>('save_pdf_config', { pdfConfig });

// Memory
export const memoryConfig     = ()                         => call<MemoryConfig>('get_memory_config');
export const saveMemoryConfig = (memoryConfig: MemoryConfig) => call<string>('save_memory_config', { memoryConfig });

// Home dir
export const homeDir = () => call<string>('get_openclaw_home_dir');
