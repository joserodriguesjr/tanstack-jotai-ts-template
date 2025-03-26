import { Link } from '@tanstack/react-router';
import React, { useEffect } from 'react';

import type { Pokemon } from '@/entities/pokemon';
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({
  pokemon,
  setSelectedPokemon,
}) => {
  useEffect(() => {
    return () => setSelectedPokemon(null);
  }, [setSelectedPokemon]);

  if (!pokemon) return null;

  return (
    <Dialog open onOpenChange={() => setSelectedPokemon(null)}>
      <DialogContent>
        <DialogTitle className="text-center text-2xl font-bold capitalize">
          {pokemon.englishName}, #{pokemon.nationalNumber}
        </DialogTitle>

        <DialogDescription className="text-center text-sm text-gray-600">
          {pokemon.description}
        </DialogDescription>

        <div className="my-4 flex flex-row items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.nationalNumber}.gif`}
            alt={pokemon.englishName}
            className="mx-auto h-32 w-32"
          />
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.nationalNumber}.gif`}
            alt={pokemon.englishName}
            className="mx-auto h-32 w-32"
          />
        </div>

        <div className="mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <p className="capitalize">
              <strong>Type:</strong> {pokemon.primaryType}
              {pokemon.secondaryType ? `, ${pokemon.secondaryType}` : ''}
            </p>
            <p>
              <strong>Height:</strong> {pokemon.heightM}m
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weightKg}kg
            </p>
            <p>
              <strong>Abilities:</strong> {pokemon.abilities0}
            </p>
          </div>

          <h3 className="mt-6 mb-2 text-center text-lg font-semibold">
            Base Stats
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
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
        <Link
          to="/pokemons/$pokemonName"
          params={{ pokemonName: pokemon.englishName }}
        >
          <Button className="block h-full w-full cursor-pointer">
            More details...
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};
