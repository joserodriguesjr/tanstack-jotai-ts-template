import { useAtom } from 'jotai';

import { PokemonModal } from '@/entities/pokemon/ui/pokemon-modal';
import { selectedPokemonAtom } from '@/features/pokemon/select-pokemon/select-pokemon.model';

export const SelectPokemon = () => {
  const [pokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

  return (
    <PokemonModal pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />
  );
};
