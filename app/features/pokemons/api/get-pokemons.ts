import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query';

import { getPokemons } from '@/features/pokemons/server/pokemon.controller';
import type { QueryConfig } from '@/lib/react-query';

export const getPokemonsQueryOptions = (search = '') => {
  return infiniteQueryOptions({
    queryKey: ['pokemon', search ?? ''],
    queryFn: async ({ pageParam }) => {
      const result = await getPokemons({ data: { search, pageParam } });

      return {
        content: result.content,
        nextPage:
          result.pagination.page < result.pagination.totalPages
            ? pageParam + 1
            : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    initialPageParam: 1,
  });
};

type UsePokemonsOptions = {
  queryConfig?: QueryConfig<typeof getPokemonsQueryOptions>;
  search: string;
};

export const usePokemons = ({ queryConfig, search }: UsePokemonsOptions) => {
  return useInfiniteQuery({
    ...getPokemonsQueryOptions(search),
    ...queryConfig,
  });
};
