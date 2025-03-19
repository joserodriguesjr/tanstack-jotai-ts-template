import { atom } from 'jotai';

import type { Pokemon } from '@/features/pokemons/pokemons.schema';

export const searchAtom = atom<string>('');
export const selectedPokemonAtom = atom<Pokemon | null>(null);
