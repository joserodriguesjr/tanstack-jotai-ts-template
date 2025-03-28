import { notFound } from '@tanstack/react-router';

import { logger } from '@server/logger/logger';
import type { Pokemon, PokemonDTO } from '@server/pokemon/pokemon.schema';

export interface IPokemonRepository {
  getPokemonByName: (pokemonName: string) => Promise<Pokemon | undefined>;
  getPokemonsLikeText: (
    search: string,
    pageSize: number,
    offset: number,
  ) => Promise<Pokemon[]>;
  getPokemonCount: (search: string) => Promise<number>;
}

export class PokemonService {
  pokemonRepository: IPokemonRepository;

  constructor(pokemonRepository: IPokemonRepository) {
    this.pokemonRepository = pokemonRepository;
  }

  async findPokemon({
    pokemonName,
  }: {
    pokemonName: string;
  }): Promise<Pokemon> {
    logger.info(`Fetching pokemons, looking for ${pokemonName}...`);

    const pokemon = await this.pokemonRepository.getPokemonByName(pokemonName);

    if (!pokemon) {
      logger.warn(`No Pokemon found with the given name: ${pokemonName}`);
      throw notFound({
        data: `No Pokemon found with the given name: ${pokemonName}`,
      });
    }

    return pokemon;
  }

  async findAllPokemons({
    search,
    pageParam,
    pageSize,
  }: {
    search: string;
    pageParam: number;
    pageSize: number;
  }): Promise<PokemonDTO> {
    logger.info(`Fetching pokemons for page ${pageParam}...`);

    const offset = (pageParam - 1) * pageSize;
    const [pokemonsData, totalCount] = await Promise.all([
      this.pokemonRepository.getPokemonsLikeText(search, pageSize, offset),
      this.pokemonRepository.getPokemonCount(search),
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
  }
}
