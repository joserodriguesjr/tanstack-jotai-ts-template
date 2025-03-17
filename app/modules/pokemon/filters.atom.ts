import { atom } from "jotai";
import type { Pokemon } from "./pokemon.schema";

export const searchAtom = atom<string>("");
export const pokemonAtom = atom<Pokemon | null>(null);
