export const validatePokemonName = (pokemonName: string): {pokemonName: string} => {

  if (typeof pokemonName !== "string") {
    throw new Error("Invalid pokemonName");
  }

  return { pokemonName };
};

export const validateSearchParams = ({ search, pageParam, pageSize = 24 }: { search?: string, pageParam: number, pageSize?: number }) => {
  if (typeof search !== "string") {
    throw new Error("Invalid search text");
  }

  if (typeof pageParam !== "number") {
    throw new Error("Invalid page number");
  }

  if (typeof pageSize !== "number") {
    throw new Error("Invalid page size");
  }

  return { search, pageParam, pageSize };
}