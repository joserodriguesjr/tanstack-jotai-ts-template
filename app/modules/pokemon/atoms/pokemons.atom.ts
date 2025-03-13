import { atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query";
import { fetchAllPokemonsOptions } from "../api/fetch-pokemons.api";
import { searchAtom } from "./search.atom";

export const pokemonsAtom = atomWithSuspenseInfiniteQuery((get) => fetchAllPokemonsOptions(get(searchAtom)));