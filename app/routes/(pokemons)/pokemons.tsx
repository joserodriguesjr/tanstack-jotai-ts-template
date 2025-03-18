import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PokemonHeader } from "@/features/pokemons/components/pokemon-header";

export const Route = createFileRoute("/(pokemons)/pokemons")({
  component: () => (
    <>
      <PokemonHeader />
      <Outlet />
    </>
  ),
});
