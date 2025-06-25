import { queryOptions, useQuery } from '@tanstack/react-query';

import type { QueryConfig } from 'src/shared/lib/react-query';
import { getPokemon } from '@server/pokemon/pokemon.controller';

export const getPokemonQueryOptions = (pokemonName: string) => {
  return queryOptions({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => getPokemon({ data: pokemonName }),
  });
};

type UsePokemonOptions = {
  queryConfig?: QueryConfig<typeof getPokemonQueryOptions>;
  pokemonName: string;
};

export const usePokemon = ({ queryConfig, pokemonName }: UsePokemonOptions) => {
  return useQuery({
    ...getPokemonQueryOptions(pokemonName),
    ...queryConfig,
  });
};
