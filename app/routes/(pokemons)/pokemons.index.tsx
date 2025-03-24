import { createFileRoute } from '@tanstack/react-router';

import { SelectPokemon } from '@/features/pokemon';
import { PokemonList } from '@/widgets/pokemon';

export const Route = createFileRoute('/(pokemons)/pokemons/')({
  component: () => {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <PokemonList />
        <SelectPokemon />
      </div>
    );
  },
});
