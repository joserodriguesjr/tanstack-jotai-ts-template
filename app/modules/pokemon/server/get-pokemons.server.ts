import { createServerFn } from "@tanstack/react-start";
import db from "@/db/db";
import { pokemons } from "@/db/schema";
import { eq, like, sql } from "drizzle-orm";
import type { Pokemon } from "../pokemon.schema";
import type { PokemonDTO } from "../pokemon.api";

export const getAllPokemonsAction = createServerFn({
  method: "GET",
})
  .validator(({ search, pageParam, pageSize = 24 }: { search?: string, pageParam: number, pageSize?: number }) => {

    if (typeof pageParam !== "number") {
      throw new Error("Invalid page number");
    }

    return { search, pageParam, pageSize };
  })
  .handler(async ({ data: { search, pageParam, pageSize }}): Promise<PokemonDTO> => {
    console.info(`Fetching pokemons for page ${pageParam}...`);
    const offset = (pageParam - 1) * pageSize;
 // Obtém os Pokémon da página atual
 
  const pokemonsData = await db
    .select()
    .from(pokemons)
    .where(
      search ? like(sql`LOWER(${pokemons.englishName})`, `%${search.toLowerCase()}%`) : undefined
    )
    .limit(pageSize)
    .offset(offset)
    .all() as Pokemon[];

  // Obtém o total de registros para calcular paginação
  const totalCount = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(pokemons)
    .where(
      search ? like(sql`LOWER(${pokemons.englishName})`, `%${search.toLowerCase()}%`) : undefined
    )
    .get()?.count ?? 0;

  return {
    content: pokemonsData,
    pagination: {
      total: totalCount,
      page: pageParam,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize)
    }
  };

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
  .handler(async ({ data: { pokemonName } }): Promise<Pokemon> => {
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
