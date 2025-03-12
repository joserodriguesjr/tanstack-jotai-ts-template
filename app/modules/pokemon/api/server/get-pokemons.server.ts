import { createServerFn } from '@tanstack/react-start'
import db from 'drizzle/db';
import { pokemons } from 'drizzle/schema';
import { eq } from 'drizzle-orm';
import type { Pokemon } from '../../pokemon.schema';

export const getAllPokemonsAction = createServerFn({ 
    method: 'GET' 
})
    .validator((page: number) => {
        if (typeof page !== 'number') {
            throw new Error('Invalid page number');
          }
          return page;
    })
    .handler(async ({ data }: {data : number}) => {
    console.info(`Fetching pokemons for page ${data}...`);
  
    try {
        const pageSize = 24;
        const offset = (data - 1) * pageSize;

        const paginatedPokemons = db.select()
            .from(pokemons)
            .limit(pageSize)
            .offset(offset)
            .all();

        return paginatedPokemons as Pokemon[];
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
});

export const getPokemonAction = createServerFn({ 
    method: 'GET' 
})
    .validator((pokemonName: string) => {
        if (typeof pokemonName !== 'string') {
            throw new Error('Invalid pokemonName');
          }
          return pokemonName;
    })
    .handler(async ({ data }: {data : string}) => {
    console.info(`Fetching pokemons, looking for ${data}...`);
  
    try {
        const pokemon = db.select()
            .from(pokemons)
            .where(eq(pokemons.englishName, data))
            .get();

        return pokemon;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
});
