import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { fetchPokemonOptions } from '@/modules/pokemon/api/fetchPokemon'
import { PokemonPage } from '@/modules/pokemon/pages/pokemon.page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(pokemons)/pokemons_/$pokemon')({
  loader: ({ context: { queryClient }, params: { pokemon } }) =>
    queryClient.ensureQueryData(fetchPokemonOptions(pokemon)),
  component: () => (
    <Suspense fallback={<Loading />}>
      <PokemonPage />
    </Suspense>
  ),
})

