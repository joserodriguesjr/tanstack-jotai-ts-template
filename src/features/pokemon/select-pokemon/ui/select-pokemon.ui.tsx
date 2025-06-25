import { useAtom } from 'jotai';

import { PokemonModal } from 'src/entities/pokemon';
import { selectedPokemonAtom } from 'src/features/pokemon/select-pokemon/model';

export const SelectPokemon = () => {
  const [pokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

  return (
    <PokemonModal pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />
  );
};
