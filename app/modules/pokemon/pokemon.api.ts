import type { Pokemon } from "./pokemon.schema";

export interface PokemonDTO {
    content: Pokemon[];
    pagination: {
        total: number;
        page: number;
        pageSize : number;
          totalPages: number;
    }
}