import { atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query";
import { fetchAllPokemonsOptions } from "../api/fetch-pokemons.api";

export const pokemonsAtom = atomWithSuspenseInfiniteQuery(
  () => fetchAllPokemonsOptions,
);
