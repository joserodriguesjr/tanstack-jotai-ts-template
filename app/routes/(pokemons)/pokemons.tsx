import { Outlet, createFileRoute } from '@tanstack/react-router';

import { PokemonHeader } from '@/widgets/pokemon';

export const Route = createFileRoute('/(pokemons)/pokemons')({
  component: () => (
    <>
      <PokemonHeader />
      <Outlet />
    </>
  ),
});
