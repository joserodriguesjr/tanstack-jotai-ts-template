import { createFileRoute, redirect, Link } from '@tanstack/react-router';

import {
  getPokemonQueryOptions,
  usePokemon,
} from '@/entities/pokemon/api/get-pokemon';
import { Button } from '@/shared/ui/button';
import Loading from '@/shared/ui/loading';

export const Route = createFileRoute('/(pokemons)/pokemons_/$pokemonName')({
  loader: async ({ context: { queryClient }, params: { pokemonName } }) =>
    queryClient.prefetchQuery(getPokemonQueryOptions(pokemonName)),
  onError(err: Error) {
    throw redirect({ to: '/pokemons', replace: true, throw: err });
  },
  component: PokemonView,
});

function PokemonView() {
  const { pokemonName } = Route.useParams();
  const pokemonQuery = usePokemon({ pokemonName });

  if (pokemonQuery.isLoading) {
    return <Loading />;
  }

  const pokemon = pokemonQuery?.data;

  if (!pokemon) return null;

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {/* Back Button */}
      <Link to="/pokemons">
        <Button className="block h-full cursor-pointer">Back to Pokedex</Button>
      </Link>

      {/* Header */}
      <h1 className="text-center text-3xl font-bold capitalize">
        {pokemon.englishName}
      </h1>
      <p className="text-center text-gray-500">{pokemon.japaneseName}</p>

      {/* Image */}
      <div className="my-4 flex justify-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.nationalNumber}.png`}
          alt={pokemon.englishName!}
          className="h-32 w-32"
        />
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4">
        <p>
          <strong>National Number:</strong> #{pokemon.nationalNumber}
        </p>
        <p>
          <strong>Generation:</strong> {pokemon.gen}
        </p>
        <p>
          <strong>Classification:</strong> {pokemon.classification}
        </p>
        <p>
          <strong>Height:</strong> {pokemon.heightM} m
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weightKg} kg
        </p>
        <p>
          <strong>Capture Rate:</strong> {pokemon.captureRate}
        </p>
        <p>
          <strong>Base Egg Steps:</strong> {pokemon.baseEggSteps}
        </p>
        <p>
          <strong>Gigantamax:</strong> {pokemon.gigantamax ?? 'No'}
        </p>
        <p>
          <strong>Mega Evolution:</strong> {pokemon.megaEvolution ?? 'No'}
        </p>
      </div>

      {/* Types */}
      <div className="my-4">
        <p>
          <strong>Type:</strong> {pokemon.primaryType}{' '}
          {pokemon.secondaryType ? `, ${pokemon.secondaryType}` : ''}
        </p>
      </div>

      {/* Abilities */}
      <div className="my-4">
        <p>
          <strong>Abilities:</strong> {pokemon.abilities0},{' '}
          {pokemon.abilities1 ?? '—'}, {pokemon.abilities2 ?? '—'}
        </p>
        <p>
          <strong>Hidden Ability:</strong> {pokemon.abilitiesHidden ?? 'None'}
        </p>
      </div>

      {/* Base Stats */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Base Stats</h2>
        <div className="grid grid-cols-2 gap-2">
          <p>
            <strong>HP:</strong> {pokemon.hp}
          </p>
          <p>
            <strong>Attack:</strong> {pokemon.attack}
          </p>
          <p>
            <strong>Defense:</strong> {pokemon.defense}
          </p>
          <p>
            <strong>Sp. Attack:</strong> {pokemon.spAttack}
          </p>
          <p>
            <strong>Sp. Defense:</strong> {pokemon.spDefense}
          </p>
          <p>
            <strong>Speed:</strong> {pokemon.speed}
          </p>
        </div>
      </div>

      {/* Weaknesses */}
      <div className="my-4">
        <h2 className="text-xl font-bold">Weaknesses</h2>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(pokemon)
            .filter(([key]) => key.startsWith('against'))
            .map(([key, value]) => (
              <p key={key}>
                <strong>{key.replace('against', '')}:</strong> x{value}
              </p>
            ))}
        </div>
      </div>

      {/* Evolution Chain */}
      {pokemon.evochain0 && (
        <div className="my-4">
          <h2 className="text-xl font-bold">Evolution Chain</h2>
          <div className="flex justify-center gap-2">
            {[
              pokemon.evochain0,
              pokemon.evochain1,
              pokemon.evochain2,
              pokemon.evochain3,
              pokemon.evochain4,
              pokemon.evochain5,
              pokemon.evochain6,
            ]
              .filter(Boolean)
              .filter((evo) => evo?.trim() !== 'Level')
              .map((evo, index) => (
                <span key={index} className="rounded bg-gray-200 px-2 py-1">
                  {evo}
                </span>
              ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Description</h2>
        <p className="text-gray-700">{pokemon.description}</p>
      </div>
    </div>
  );
}
