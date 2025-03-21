import { createServerFn } from '@tanstack/react-start';

import { findAllPokemons, findPokemon } from '@server/pokemon/pokemon.service';
import {
  validatePokemonName,
  validateSearchParams,
} from '@server/pokemon/pokemon.validator';

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
