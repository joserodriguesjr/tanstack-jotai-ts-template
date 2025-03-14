import { Suspense } from "react";
import Loading from "@/components/Loading";
import { fetchPokemonOptions } from "@/modules/pokemon/api/fetch-pokemons.api";
import { PokemonPage } from "@/modules/pokemon/pages/pokemon.page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";

export const Route = createFileRoute("/(pokemons)/pokemons_/$pokemon")({
  loader: async ({ context: { queryClient }, params: { pokemon } }) => {
    // Checking if pokemon is cached
    const cachedPokemon = queryClient.getQueryData<Pokemon>([
      "pokemon",
      pokemon,
    ]);
    if (cachedPokemon) {
      console.log("[LOADER] cachedPokemon", cachedPokemon);
      return cachedPokemon;
    }

    // Checking if pokemon is inside cached pokemons
    const cachedPokemons = queryClient.getQueryData<{ pages: Pokemon[] }>([
      "pokemons",
    ]);
    const foundPokemon = cachedPokemons?.pages
      .flatMap((page) => page)
      .find((item) => item.englishName.toLowerCase() === pokemon.toLowerCase());
      if (foundPokemon) {
      console.log("[LOADER] foundPokemon", foundPokemon);
      return foundPokemon;
    }

    // If not cached, fetch from the API
    return queryClient.ensureQueryData(fetchPokemonOptions(pokemon));
  },
  onError(err: Error) {
    throw redirect({ to: "/pokemons", replace: true, throw: err });
  },
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokemonPage />
    </Suspense>
  ),
});
