import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PokemonHeader } from "@/modules/pokemon/components/PokemonHeader";

export const Route = createFileRoute("/(pokemons)/pokemons")({
  component: () => (
    <>
      <PokemonHeader />
      <Outlet />
    </>
  ),
});
