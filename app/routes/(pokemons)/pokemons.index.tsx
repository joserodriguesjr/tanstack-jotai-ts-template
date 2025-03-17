import { Suspense } from "react";
import Loading from "@/components/Loading";
import { createFileRoute } from "@tanstack/react-router";
import { PokedexPage } from "@/modules/pokemon/pages/pokedex.page";
import { fetchPokemons } from "@/modules/pokemon/pokemon.model";

export const Route = createFileRoute("/(pokemons)/pokemons/")({
  loader: () => fetchPokemons,
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokedexPage />
    </Suspense>
  ),
});
