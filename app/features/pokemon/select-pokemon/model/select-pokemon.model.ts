// TODO REMOVE SCHEMA FROM HERE
import { atom } from 'jotai';

import type { Pokemon } from '@/entities/pokemon';

export const selectedPokemonAtom = atom<Pokemon | null>(null);
