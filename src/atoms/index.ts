import { atom } from 'jotai';

import type { Location } from '../types';

export const rentIdAtom = atom<string | null>(null);

export const returnIdAtom = atom<string | null>(null);

export const returnLocationAtom = atom<Location | null>(null);
