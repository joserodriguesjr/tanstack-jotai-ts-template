import { createServerFn } from "@tanstack/react-start";
import { validatePokemonName, validateSearchParams } from "./validators/pokemon.validator";
import { findAllPokemons, findPokemon } from "./services/pokemon.service";

export const getAllPokemonsAction = createServerFn({
  method: "GET",
})
  .validator(validateSearchParams)
  .handler(async ({ data }) => findAllPokemons(data));

export const getPokemonAction = createServerFn({
  method: "GET",
})
  .validator(validatePokemonName)
  .handler(async ({ data }) => findPokemon(data));
