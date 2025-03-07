import { useState } from "react";
import { PokedexList } from "@/modules/pokemon/components/pokedex.list";
import type { Pokemon } from "@/modules/pokemon/schemas/pokemon";
import { PokemonModal } from "../components/pokemon.modal";

export function PokedexPage() {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">Pokédex</h1>
            <PokedexList openModal={openModal} />

            {selectedPokemon && (
                <PokemonModal
                    pokemon={selectedPokemon}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </div>
    );

};