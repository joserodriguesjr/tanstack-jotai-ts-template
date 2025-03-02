import { createServerFn } from '@tanstack/react-start'
import db from 'drizzle/db';
import { pokemons } from 'drizzle/schema';

export const getPokemonsAction = createServerFn({ 
    method: 'GET' 
})
    .validator((page: number) => {
        if (typeof page !== 'number') {
            throw new Error('Invalid project ID');
          }
          return page;
    })
    .handler(async ({ data }: {data : number}) => {
    console.info(`Fetching pokemons for page ${data}...`);
  
    try {
        const pageSize = 12;
        const offset = (data - 1) * pageSize;

        const paginatedPokemons = db.select()
            .from(pokemons)
            .limit(pageSize)
            .offset(offset)
            .all();

        return paginatedPokemons;
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        throw new Error('Failed to fetch pokemons');
    }
});
