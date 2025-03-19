import { createFileRoute } from '@tanstack/react-router';

import { PokemonList } from '@/features/pokemons/components/pokemon-list';

export const Route = createFileRoute('/(pokemons)/pokemons/')({
  component: PokemonList,
});
