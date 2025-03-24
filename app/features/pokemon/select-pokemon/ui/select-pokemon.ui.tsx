import { useAtom } from 'jotai';

import { PokemonModal } from '@/entities/pokemon';
import { selectedPokemonAtom } from '@/features/pokemon/select-pokemon/model';

export const SelectPokemon = () => {
  const [pokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

  return (
    <PokemonModal pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />
  );
};
