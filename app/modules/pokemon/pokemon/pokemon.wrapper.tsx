import { usePokemonViewModel } from "./pokemon.viewModel";
import { PokemonView } from "./pokemon.view";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { fetchPokemon } from "./pokemon.model";

export function PokemonWrapper() {
    const viewModel = usePokemonViewModel(fetchPokemon)

    return (
        <Suspense fallback={<Loading />}>
            <PokemonView {...viewModel} />
        </Suspense>
    )
} 