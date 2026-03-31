import { call } from './bridge';
import type { Skill } from '../types';

export const list      = ()              => call<Skill[]>('get_skills');
export const install   = (name: string)  => call<string>('install_skill', { skillName: name });
export const uninstall = (id: string)    => call<string>('uninstall_skill', { skillId: id });
