import { createServerFn } from "@tanstack/react-start";
import { validatePokemonName, validateSearchParams } from "./pokemon.validator";
import { findAllPokemons, findPokemon } from "./pokemon.service";

export const getPokemons = createServerFn({
  method: "GET",
})
  .validator(validateSearchParams)
  .handler(async ({ data }) => findAllPokemons(data));

export const getPokemon = createServerFn({
  method: "GET",
})
  .validator(validatePokemonName)
  .handler(async ({ data }) => findPokemon(data));
