import { notFound } from '@tanstack/react-router';

import {
  getPokemonByName,
  getPokemonCount,
  getPokemonsLikeText,
} from '@server/pokemon/pokemon.repository';
import type { PokemonDTO } from '@server/pokemon/pokemon.schema';

export const findPokemon = async ({ pokemonName }: { pokemonName: string }) => {
  console.info(`Fetching pokemons, looking for ${pokemonName}...`);

  const pokemon = await getPokemonByName(pokemonName);

  if (!pokemon) {
    throw notFound({
      data: `No Pokemon found with the given name: ${pokemonName}`,
    });
  }

  return pokemon;
};

export const findAllPokemons = async ({
  search,
  pageParam,
  pageSize,
}: {
  search: string;
  pageParam: number;
  pageSize: number;
}): Promise<PokemonDTO> => {
  console.info(`Fetching pokemons for page ${pageParam}...`);

  const offset = (pageParam - 1) * pageSize;
  const [pokemonsData, totalCount] = await Promise.all([
    getPokemonsLikeText(search, pageSize, offset),
    getPokemonCount(search),
  ]);

  return {
    content: pokemonsData,
    pagination: {
      total: totalCount,
      page: pageParam,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};
