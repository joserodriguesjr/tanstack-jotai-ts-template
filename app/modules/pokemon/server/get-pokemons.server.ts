import { createServerFn } from "@tanstack/react-start";
import db from "drizzle/db";
import { pokemons } from "drizzle/schema";
import { eq } from "drizzle-orm";
import type { Pokemon } from "../pokemon.schema";

export const getAllPokemonsAction = createServerFn({
  method: "GET",
})
  .validator(({ pageParam, pageSize = 24 }: { pageParam: number, pageSize?: number }) => {

    if (typeof pageParam !== "number") {
      throw new Error("Invalid page number");
    }

    return { pageParam, pageSize };
  })
  .handler(async ({ data: { pageParam, pageSize }}) => {
    console.info(`Fetching pokemons for page ${pageParam}...`);
    const offset = (pageParam - 1) * pageSize;

    return db
      .select()
      .from(pokemons)
      .limit(pageSize)
      .offset(offset)
      .all() as Pokemon[];
  });

export const getPokemonAction = createServerFn({
  method: "GET",
})
  .validator((pokemonName: string) => {
    
    if (typeof pokemonName !== "string") {
      throw new Error("Invalid pokemonName");
    }

    return { pokemonName };
  })
  .handler(async ({ data: { pokemonName } }) => {
    console.info(`Fetching pokemons, looking for ${pokemonName}...`);

    const pokemon = db
      .select()
      .from(pokemons)
      .where(eq(pokemons.englishName, pokemonName))
      .get();

    if (!pokemon) {
      throw new Error("No pokemon find with name");
    }

    return pokemon as Pokemon;
  });
