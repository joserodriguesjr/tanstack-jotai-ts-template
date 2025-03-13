import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { fetchPokemonOptions } from '@/modules/pokemon/api/fetch-pokemons.api'
import { PokemonPage } from '@/modules/pokemon/pages/pokemon.page'
import { createFileRoute } from '@tanstack/react-router'
import type { Pokemon } from '@/modules/pokemon/pokemon.schema'

export const Route = createFileRoute('/(pokemons)/pokemons_/$pokemon')({
  loader: async ({ context: { queryClient }, params: { pokemon } }) => {
    // Checking if pokemon is cached
    const cachedPokemon = queryClient.getQueryData<Pokemon>(['pokemon', pokemon]);
    console.log('[LOADER] cachedPokemon', cachedPokemon);
    if (cachedPokemon) {
      return cachedPokemon
    }

    // Checking if pokemon is inside cached pokemons
    const cachedPokemons = queryClient.getQueryData<{ pages: Pokemon[] }>(['pokemons']);
    console.log('[LOADER] cachedPokemons', cachedPokemons);
    const foundPokemon = cachedPokemons?.pages
      .flatMap(page => page)
      .find(item => item.englishName.toLowerCase() === pokemon.toLowerCase());
    console.log('[LOADER] foundPokemon', foundPokemon);
    if (foundPokemon) {
      return foundPokemon;
    }

    // If not cached, fetch from the API
    return queryClient.ensureQueryData(fetchPokemonOptions(pokemon))
  },
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokemonPage />
    </Suspense>
  ),
})

