import { describe, it, expect, beforeEach, vi } from 'vitest';

import {
  PokemonService,
  type IPokemonRepository,
} from '@server/pokemon/pokemon.service';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonRepositoryMock: IPokemonRepository;

  beforeEach(() => {
    pokemonRepositoryMock = {
      getPokemonByName: vi.fn(),
      getPokemonsLikeText: vi.fn(),
      getPokemonCount: vi.fn(),
    };

    pokemonService = new PokemonService(pokemonRepositoryMock);
  });

  describe('findPokemon', () => {
    it('should return a Pokemon if found', async () => {
      const pokemon = { englishName: 'Pikachu' } as any;
      (
        pokemonRepositoryMock.getPokemonByName as ReturnType<typeof vi.fn>
      ).mockResolvedValue(pokemon);

      const result = await pokemonService.findPokemon({
        pokemonName: 'Pikachu',
      });

      expect(result).toEqual(pokemon);
      expect(pokemonRepositoryMock.getPokemonByName).toHaveBeenCalledWith(
        'Pikachu',
      );
    });

    it('should throw notFound if Pokemon is not found', async () => {
      (
        pokemonRepositoryMock.getPokemonByName as ReturnType<typeof vi.fn>
      ).mockResolvedValue(undefined);

      await expect(
        pokemonService.findPokemon({
          pokemonName: 'Pikachu',
        }),
      ).rejects.toEqual({
        data: 'No Pokemon found with the given name: Pikachu',
        isNotFound: true,
      });

      expect(pokemonRepositoryMock.getPokemonByName).toHaveBeenCalledWith(
        'Pikachu',
      );
    });
  });

  describe('findAllPokemons', () => {
    it('should return a PokemonDTO with correct pagination', async () => {
      const pokemonsData = [
        { englishName: 'Pikachu' },
        { englishName: 'Charmander' },
      ] as any[];
      const totalCount = 10;
      const pageParam = 2;
      const pageSize = 5;
      const offset = (pageParam - 1) * pageSize;

      (
        pokemonRepositoryMock.getPokemonsLikeText as ReturnType<typeof vi.fn>
      ).mockResolvedValue(pokemonsData);
      (
        pokemonRepositoryMock.getPokemonCount as ReturnType<typeof vi.fn>
      ).mockResolvedValue(totalCount);

      const result = await pokemonService.findAllPokemons({
        search: '',
        pageParam,
        pageSize,
      });

      expect(result).toEqual({
        content: pokemonsData,
        pagination: {
          total: totalCount,
          page: pageParam,
          pageSize,
          totalPages: 2,
        },
      });
      expect(pokemonRepositoryMock.getPokemonsLikeText).toHaveBeenCalledWith(
        '',
        pageSize,
        offset,
      );
      expect(pokemonRepositoryMock.getPokemonCount).toHaveBeenCalledWith('');
    });
  });
});
