import type { Pokemon, PokemonDTO } from "../../pokemons.schema";
import { getPokemonByName, getPokemonCount, getPokemonsLikeText } from "../repositories/pokemon.repository";

export const findPokemon = async ({ pokemonName }: { pokemonName: string }): Promise<Pokemon> => { 
    console.info(`Fetching pokemons, looking for ${pokemonName}...`);
    
    const pokemon = await getPokemonByName(pokemonName);

    if (!pokemon) {
        throw new Error("No Pokémon found with the given name");
    }

    return pokemon as Pokemon;
};

export const findAllPokemons = async ({ search, pageParam, pageSize }: { search: string, pageParam: number, pageSize: number }): Promise<PokemonDTO> => { 
    console.info(`Fetching pokemons for page ${pageParam}...`);
    
    const offset = (pageParam - 1) * pageSize;
    const [pokemonsData, totalCount] = await Promise.all(
        [
            getPokemonsLikeText(search, pageSize, offset), 
            getPokemonCount(search)
        ]
    )

    return {
        content: pokemonsData,
        pagination: {
            total: totalCount,
            page: pageParam,
            pageSize,
            totalPages: Math.ceil(totalCount / pageSize)
        }
    };
}
