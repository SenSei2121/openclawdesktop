import { call } from './bridge';
import type { OfficialProvider, AIConfigOverview, ModelConfig, AIProviderOption } from '../types';

export const officialProviders = () => call<OfficialProvider[]>('get_official_providers');
export const overview          = () => call<AIConfigOverview>('get_ai_config');

/** @deprecated Use officialProviders() */
export const legacyProviders   = () => call<AIProviderOption[]>('get_ai_providers');

export const saveProvider = (
  providerName: string,
  baseUrl: string,
  apiKey: string | null,
  apiType: string,
  models: ModelConfig[],
) => call<string>('save_provider', { providerName, baseUrl, apiKey, apiType, models });

export const deleteProvider    = (providerName: string) => call<string>('delete_provider', { providerName });
export const setPrimaryModel   = (modelId: string)      => call<string>('set_primary_model', { modelId });
export const addModel          = (modelId: string)      => call<string>('add_available_model', { modelId });
export const removeModel       = (modelId: string)      => call<string>('remove_available_model', { modelId });
