import { createFileRoute, redirect } from "@tanstack/react-router";
import { PokemonWrapper } from "@/modules/pokemon/pokemon/pokemon.wrapper";
import { pokemonLoader } from "@/modules/pokemon/pokemon/pokemon.loader";
import { fetchPokemon } from "@/modules/pokemon/pokemon/pokemon.model";

export const Route = createFileRoute("/(pokemons)/pokemons_/$pokemonName")({
  loader: async ({
    context: { queryClient },
    params: { pokemonName }
  }) => pokemonLoader(queryClient, pokemonName, fetchPokemon),
  onError(err: Error) {
    throw redirect({ to: "/pokemons", replace: true, throw: err });
  },
  component: PokemonWrapper,
});
