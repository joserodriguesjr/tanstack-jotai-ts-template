import { createServerFn } from '@tanstack/react-start';

import { logger } from '@server/logger/logger';
import { PokemonRepository } from '@server/pokemon/pokemon.repository';
import { PokemonService } from '@server/pokemon/pokemon.service';

const pokemonRepository = new PokemonRepository();
const pokemonService = new PokemonService(pokemonRepository);

export const getPokemons = createServerFn({
  method: 'GET',
})
  .validator(
    ({
      search,
      pageParam,
      pageSize = 24,
    }: {
      search?: string;
      pageParam: number;
      pageSize?: number;
    }) => {
      if (typeof search !== 'string') {
        logger.error('Invalid search text');
        throw new Error('Invalid search text');
      }

      if (typeof pageParam !== 'number') {
        logger.error('Invalid page number');
        throw new Error('Invalid page number');
      }

      if (typeof pageSize !== 'number') {
        logger.error('Invalid page size');
        throw new Error('Invalid page size');
      }

      return { search, pageParam, pageSize };
    },
  )
  .handler(async ({ data }) => pokemonService.findAllPokemons(data));

export const getPokemon = createServerFn({
  method: 'GET',
})
  .validator((pokemonName: string): { pokemonName: string } => {
    if (typeof pokemonName !== 'string') {
      logger.error('Invalid pokemonName');
      throw new Error('Invalid pokemonName');
    }

    return { pokemonName };
  })
  .handler(async ({ data }) => pokemonService.findPokemon(data));
