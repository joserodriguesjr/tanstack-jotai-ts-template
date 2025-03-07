import { useState } from "react";
import { useAtom } from "jotai";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pokemonsAtom } from "@/modules/pokemon/api/fetchPokemons";
import { useInfiniteScroll } from "@/modules/pokemon/hooks/useInfiniteScroll";
import type { Pokemon } from "@/modules/pokemon/schemas/pokemon";

interface PokemonListProps {
    openModal: (pokemon: Pokemon) => void;
}

export const PokedexList: React.FC<PokemonListProps> = ({ openModal }) => {
    const [search, setSearch] = useState("");
    const searchQuery = search.trim().toLowerCase();

    const [{ data, fetchNextPage, hasNextPage, isFetchingNextPage }] = useAtom(pokemonsAtom)

    const { loadMoreRef } = useInfiniteScroll({
        onIntersect: fetchNextPage,
        hasMore: hasNextPage,
        isFetching: isFetchingNextPage,
    });

    return (
        <>
            <Input
                type="text"
                placeholder="Search Pokémon..."
                className="mb-4 w-full p-2 border rounded"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.pages?.flatMap((page) =>
                    page
                        .filter((pokemon) => pokemon.englishName!.toLowerCase().includes(searchQuery))
                        .map((pokemon, index, arr) => (
                            <Card
                                key={pokemon.nationalNumber}
                                className="p-4 flex flex-col items-center"
                                onClick={() => openModal(pokemon as Pokemon)}
                                ref={index === arr.length - 1 ? loadMoreRef : null}
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
                        ))
                )}
            </div>
        </>
    )
}