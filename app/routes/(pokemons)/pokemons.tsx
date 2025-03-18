import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PokemonHeader } from "@/features/pokemons/pokemons-header.component";

export const Route = createFileRoute("/(pokemons)/pokemons")({
  component: () => (
    <>
      <PokemonHeader />
      <Outlet />
    </>
  ),
});
