import { createServerFn } from '@tanstack/react-start';

import {
  findAllPokemons,
  findPokemon,
} from '@/features/pokemons/server/pokemon.service';
import {
  validatePokemonName,
  validateSearchParams,
} from '@/features/pokemons/server/pokemon.validator';

export const getPokemons = createServerFn({
  method: 'GET',
})
  .validator(validateSearchParams)
  .handler(async ({ data }) => findAllPokemons(data));

export const getPokemon = createServerFn({
  method: 'GET',
})
  .validator(validatePokemonName)
  .handler(async ({ data }) => findPokemon(data));
