import { createFileRoute, redirect } from '@tanstack/react-router';

import { PokemonView } from '@/features/pokemons/components/pokemon-view';
import { getPokemonQueryOptions } from '@/features/pokemons/services/get-pokemon';

export const Route = createFileRoute('/(pokemons)/pokemons_/$pokemonName')({
  loader: async ({ context: { queryClient }, params: { pokemonName } }) =>
    queryClient.prefetchQuery(getPokemonQueryOptions(pokemonName)),
  onError(err: Error) {
    throw redirect({ to: '/pokemons', replace: true, throw: err });
  },
  component: PokemonView,
});
