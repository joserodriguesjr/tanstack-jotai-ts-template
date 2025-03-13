import { useState } from "react";
import { PokedexList } from "@/modules/pokemon/components/PokedexList";
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";
import { PokemonModal } from "../components/PokemonModal";

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
}
