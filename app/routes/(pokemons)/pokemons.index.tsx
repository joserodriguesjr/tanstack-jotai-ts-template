import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { usePokemons } from '@/entities/pokemon';
import { SelectPokemon } from '@/features/pokemon';
import Loading from '@/shared/components/loading';
import { PokemonList } from '@/widgets/pokemon';

export const Route = createFileRoute('/(pokemons)/pokemons/')({
  component: () => {
    const { isLoading } = usePokemons();
    const [isIndexedDBLoaded, setIsIndexedDBLoaded] = useState(false);

    useEffect(() => {
      if (!isLoading) {
        setIsIndexedDBLoaded(true);
      }
    }, [isLoading]);

    // todo: tentar com suspense
    return (
      <>
        {isIndexedDBLoaded ? <PokemonList /> : <Loading />}
        <SelectPokemon />
      </>
    );
  },
});
