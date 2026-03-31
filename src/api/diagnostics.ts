import { call } from './bridge';
import type { DiagnosticResult, AITestResult } from '../types';

export const doctor      = ()                    => call<DiagnosticResult[]>('run_doctor');
export const testAI      = ()                    => call<AITestResult>('test_ai_connection');
export const testChannel = (channelType: string) => call<unknown>('test_channel', { channelType });
