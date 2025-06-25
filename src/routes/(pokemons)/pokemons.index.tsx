import { createFileRoute } from '@tanstack/react-router';

import { SelectPokemon } from 'src/features/pokemon';
import { useIsMounted } from 'src/shared/hooks/use-is-mounted';
import { PokemonList } from 'src/widgets/pokemon';
import { PokemonListSkeleton } from 'src/widgets/pokemon/pokemon-list/pokemon-list.skeleton';

export const Route = createFileRoute('/(pokemons)/pokemons/')({
  component: () => {
    const isMounted = useIsMounted();

    return (
      <>
        {isMounted ? <PokemonList /> : <PokemonListSkeleton />}
        <SelectPokemon />
      </>
    );
  },
});
