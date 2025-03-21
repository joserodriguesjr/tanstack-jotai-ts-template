import { atom } from 'jotai';

// TODO REMOVE SCHEMA FROM HERE
import type { Pokemon } from '@/entities/pokemon/model/pokemon.schema';

export const selectedPokemonAtom = atom<Pokemon | null>(null);
