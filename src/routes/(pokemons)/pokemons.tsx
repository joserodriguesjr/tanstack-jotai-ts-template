import { Outlet, createFileRoute } from '@tanstack/react-router';

import { useIsMounted } from 'src/shared/hooks/use-is-mounted';
// import { ChatSidebar } from 'src/widgets/chat';
import { PokemonHeader } from 'src/widgets/pokemon';
import { PokemonHeaderSkeleton } from 'src/widgets/pokemon/pokemon-header/pokemon-header.skeleton';

export const Route = createFileRoute('/(pokemons)/pokemons')({
  component: () => {
    const isMounted = useIsMounted();

    return (
      <>
        {isMounted ? <PokemonHeader /> : <PokemonHeaderSkeleton />}
        {/* <ChatSidebar /> */}
        <Outlet />
      </>
    );
  },
});
