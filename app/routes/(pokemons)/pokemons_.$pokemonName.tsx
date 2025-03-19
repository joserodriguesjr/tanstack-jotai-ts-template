import { createFileRoute, redirect } from '@tanstack/react-router';

import { getPokemonQueryOptions } from '@/features/pokemons/api/get-pokemon';
import { PokemonView } from '@/features/pokemons/components/pokemon-view';

export const Route = createFileRoute('/(pokemons)/pokemons_/$pokemonName')({
  loader: async ({ context: { queryClient }, params: { pokemonName } }) =>
    queryClient.prefetchQuery(getPokemonQueryOptions(pokemonName)),
  onError(err: Error) {
    throw redirect({ to: '/pokemons', replace: true, throw: err });
  },
  component: PokemonView,
});
