import { call } from './bridge';
import type { ChannelConfig } from '../types';

export const list = ()                    => call<ChannelConfig[]>('get_channels_config');
export const save = (channel: ChannelConfig) => call<string>('save_channel_config', { channel });
