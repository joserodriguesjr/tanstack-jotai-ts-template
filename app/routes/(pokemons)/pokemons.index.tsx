import { createFileRoute } from "@tanstack/react-router";
import { PokedexWrapper } from "@/modules/pokemon/pokedex/pokedex.wrapper";

export const Route = createFileRoute("/(pokemons)/pokemons/")({
  component: PokedexWrapper,
});
