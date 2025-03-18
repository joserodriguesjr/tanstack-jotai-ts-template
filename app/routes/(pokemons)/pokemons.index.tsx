import { createFileRoute } from "@tanstack/react-router";
import { PokedexPage } from "@/features/pokemons/pokedex/pokedex.page";

export const Route = createFileRoute("/(pokemons)/pokemons/")({
  component: PokedexPage,
});
