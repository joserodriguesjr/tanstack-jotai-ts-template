import { createFileRoute } from '@tanstack/react-router';

import { SelectPokemon } from '@/features/pokemon';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { PokemonList } from '@/widgets/pokemon';
import { PokemonListSkeleton } from '@/widgets/pokemon/pokemon-list/pokemon-list.skeleton';

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
