import { createFileRoute, Outlet } from '@tanstack/react-router';

import { PokemonHeader } from '@/widgets/pokemon/pokemon-header/pokemon-header.ui';

export const Route = createFileRoute('/(pokemons)/pokemons')({
  component: () => (
    <>
      <PokemonHeader />
      <Outlet />
    </>
  ),
});
