import { createServerFn } from '@tanstack/react-start'
import db from 'drizzle/db';
import { eq } from 'drizzle-orm';
import { pokemons } from 'drizzle/schema';

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
