import { eq, like, sql } from 'drizzle-orm';

import { db } from '@server/db/db';
import { pokemons } from '@server/db/schema';
import type { Pokemon } from '@server/pokemon/pokemon.schema';
import type { IPokemonRepository } from '@server/pokemon/pokemon.service';

export class PokemonRepository implements IPokemonRepository {
  async getPokemonByName(pokemonName: string): Promise<Pokemon | undefined> {
    const pokemonData = await db
      .select()
      .from(pokemons)
      .where(eq(pokemons.englishName, pokemonName))
      .get();

    if (!pokemonData) {
      return undefined;
    }

    return pokemonData as Pokemon;
  }

  async getPokemonsLikeText(
    search: string,
    pageSize: number,
    offset: number,
  ): Promise<Pokemon[]> {
    return db
      .select()
      .from(pokemons)
      .where(
        search
          ? like(
              sql`LOWER(${pokemons.englishName})`,
              `%${search.toLowerCase()}%`,
            )
          : undefined,
      )
      .limit(pageSize)
      .offset(offset)
      .all() as Pokemon[];
  }

  async getPokemonCount(search: string): Promise<number> {
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
  }
}
