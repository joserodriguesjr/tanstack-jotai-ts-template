import { Outlet, createFileRoute } from '@tanstack/react-router';

import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { PokemonHeader } from '@/widgets/pokemon';
import { PokemonHeaderSkeleton } from '@/widgets/pokemon/pokemon-header/pokemon-header.skeleton';

export const Route = createFileRoute('/(pokemons)/pokemons')({
  component: () => {
    const isMounted = useIsMounted();

    return (
      <>
        {isMounted ? <PokemonHeader /> : <PokemonHeaderSkeleton />}
        <Outlet />
      </>
    );
  },
});
