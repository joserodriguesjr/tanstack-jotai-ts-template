import { eq, like, sql } from 'drizzle-orm';

import { db } from '@server/db/db';
import { pokemons } from '@server/db/schema';
import type { Pokemon } from '@server/pokemon/pokemon.schema';

export const getPokemonByName = async (
  pokemonName: string,
): Promise<Pokemon | null> => {
  return db
    .select()
    .from(pokemons)
    .where(eq(pokemons.englishName, pokemonName))
    .get() as Pokemon | null;
};

export const getPokemonsLikeText = async (
  search: string,
  pageSize: number,
  offset: number,
) => {
  return db
    .select()
    .from(pokemons)
    .where(
      search
        ? like(sql`LOWER(${pokemons.englishName})`, `%${search.toLowerCase()}%`)
        : undefined,
    )
    .limit(pageSize)
    .offset(offset)
    .all() as Pokemon[];
};

export const getPokemonCount = async (search: string) => {
  return (
    db
      .select({ count: sql<number>`COUNT(*)` })
      .from(pokemons)
      .where(
        search
          ? like(
              sql`LOWER(${pokemons.englishName})`,
              `%${search.toLowerCase()}%`,
            )
          : undefined,
      )
      .get()?.count ?? 0
  );
};
