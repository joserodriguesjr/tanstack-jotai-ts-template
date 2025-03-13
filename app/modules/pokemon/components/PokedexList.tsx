import { useAtomValue, useSetAtom } from "jotai";
import { Card, CardContent } from "@/components/ui/card";
import { pokemonsAtom } from "@/modules/pokemon/atoms/pokemons.atom";
import { useInfiniteScroll } from "@/modules/pokemon/hooks/useInfiniteScroll";
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";
import { pokemonAtom } from "../atoms/pokemon.atom";
import { useEffect } from "react";

const preloadImages = (pokemonList: Pokemon[]) => {
  pokemonList.forEach((pokemon) => {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.nationalNumber}.gif`;
    const backImg = new Image();
    backImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.nationalNumber}.gif`;
  });
};


export const PokedexList: React.FC = () => {
  const setPokemon = useSetAtom(pokemonAtom);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAtomValue(pokemonsAtom);

  const pokemons = data?.pages?.flatMap((page) => page.content) || [];
  
  const { loadMoreRef } = useInfiniteScroll({
    onIntersect: fetchNextPage,
    hasMore: hasNextPage,
    isFetching: isFetchingNextPage,
  });
  
  const lastPokemonIndex = pokemons.length - 5;

  useEffect(() => {
    preloadImages(pokemons);
  }, [pokemons]);

  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => {
          return (
            <Card
              key={pokemon.nationalNumber}
              className="p-4 flex flex-col items-center cursor-pointer"
              onClick={() => setPokemon(pokemon as Pokemon)}
              ref={index === lastPokemonIndex ? loadMoreRef : undefined}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.nationalNumber}.png`}
                alt={pokemon.englishName!}
                className="w-24 h-24"
              />
              <CardContent>
                <h2 className="text-base font-semibold capitalize">
                  {pokemon.englishName} #{pokemon.nationalNumber}
                </h2>
                <p className="text-sm text-gray-500 capitalize text-center">
                  {[pokemon.primaryType, pokemon.secondaryType]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
  );
};
