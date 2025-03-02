import { Suspense, useState } from "react";
import { createFileRoute } from '@tanstack/react-router'
import { useAtom } from "jotai";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Loading from "@/components/Loading";
import { fetchPokemonsOptions, pokemonsAtom } from "@/modules/pokemon/api/fetchPokemons";

export const Route = createFileRoute('/pokemons')({
    loader: ({ context: { queryClient } }) => queryClient.prefetchInfiniteQuery(fetchPokemonsOptions),
    component: PokedexView,
})

function PokedexViewContent() {
    const [{ data, fetchNextPage, hasNextPage, isFetchingNextPage }] = useAtom(pokemonsAtom)
    const [search, setSearch] = useState("");

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-4">Pokédex</h1>
            <Input
                type="text"
                placeholder="Search Pokémon..."
                className="mb-4 w-full p-2 border rounded"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.pages?.flatMap((page) =>
                    page
                        .filter((pokemon) => pokemon.englishName!.includes(search))
                        .map((pokemon) => (
                            <Card key={pokemon.nationalNumber} className="p-4 flex flex-col items-center">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.nationalNumber}.png`}
                                    alt={pokemon.englishName!}
                                    className="w-24 h-24"
                                />
                                <CardContent>
                                    <h2 className="text-lg font-semibold capitalize">{pokemon.englishName}</h2>
                                    <p className="text-sm text-gray-500 capitalize">
                                        {`${pokemon.primaryType}, ${pokemon.secondaryType}`}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                )}
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    {isFetchingNextPage ? "Loading more..." : "Load More"}
                </button>
            </div>
        </div>
    );

};

function PokedexView() {
    return (
        <Suspense fallback={<Loading />}>
            <PokedexViewContent />
        </Suspense>
    )
}
