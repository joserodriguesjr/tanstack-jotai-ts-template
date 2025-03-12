import { useAtom, useAtomValue } from "jotai";
import { Card, CardContent } from "@/components/ui/card";
import { pokemonsAtom } from "@/modules/pokemon/atoms/pokemons.atom";
import { useInfiniteScroll } from "@/modules/pokemon/hooks/useInfiniteScroll";
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";
import { searchAtom } from "../atoms/search.atom";
import { useEffect } from "react";

const preloadImages = (pokemonList: Pokemon[]) => {
    pokemonList.forEach((pokemon) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.nationalNumber}.gif`;
        const backImg = new Image();
        backImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.nationalNumber}.gif`;
    });
};

interface PokemonListProps {
    openModal: (pokemon: Pokemon) => void;
}

export const PokedexList: React.FC<PokemonListProps> = ({ openModal }) => {
    const searchQuery = useAtomValue(searchAtom);
    const [{ data, fetchNextPage, hasNextPage, isFetchingNextPage }] = useAtom(pokemonsAtom)
    const pokemons = data?.pages?.flatMap((page) => page) || [];

    const { loadMoreRef } = useInfiniteScroll({
        onIntersect: fetchNextPage,
        hasMore: hasNextPage,
        isFetching: isFetchingNextPage,
        searchQuery: searchQuery
    });

    const filteredPokemons = pokemons.filter((pokemon) => pokemon.englishName!.toLowerCase().includes(searchQuery.toLowerCase()));
    const lastPokemonIndex = filteredPokemons.length - 1;

    useEffect(() => {
        preloadImages(pokemons);
    }, [pokemons]);


    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemons.map((pokemon, index) => {
                    return (
                        <Card
                            key={pokemon.nationalNumber}
                            className="p-4 flex flex-col items-center"
                            onClick={() => openModal(pokemon as Pokemon)}
                            ref={index === lastPokemonIndex ? loadMoreRef : null}
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.nationalNumber}.png`}
                                alt={pokemon.englishName!}
                                className="w-24 h-24"
                            />
                            <CardContent>
                                <h2 className="text-base font-semibold capitalize">{pokemon.englishName} #{pokemon.nationalNumber}</h2>
                                <p className="text-sm text-gray-500 capitalize text-center">
                                    {[pokemon.primaryType, pokemon.secondaryType].filter(Boolean).join(", ")}
                                </p>
                            </CardContent>
                        </Card>
                    )
                })
                }
            </div>
        </>
    )
}