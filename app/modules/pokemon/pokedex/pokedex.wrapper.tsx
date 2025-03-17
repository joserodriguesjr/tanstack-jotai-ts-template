import { fetchPokemons } from "./pokedex.model";
import { PokedexView } from "./pokedex.view";
import { usePokedexViewModel } from "./pokedex.viewModel";

export function PokedexWrapper() {
    const viewModel = usePokedexViewModel(fetchPokemons)

    return (
        <PokedexView {...viewModel} />
    );
} 