import React from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Pokemon } from "@/modules/pokemon/pokemon.schema";
import { Button } from "@/components/ui/button";

interface PokemonModalProps {
    pokemon: Pokemon;
    isOpen: boolean;
    onClose: () => void;
}

export const PokemonModal: React.FC<PokemonModalProps> = ({ pokemon, isOpen, onClose }) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogTitle className="text-center text-2xl font-bold capitalize">
                    {pokemon.englishName}, #{pokemon.nationalNumber}
                </DialogTitle>

                <DialogDescription className="text-gray-600 text-sm text-center">
                    {pokemon.description}
                </DialogDescription>

                <div className="flex flex-row items-center my-4">
                    {/* <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.nationalNumber}.png`}
                        alt={pokemon.englishName}
                        className="w-32 h-32 mx-auto"
                    />
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.nationalNumber}.png`}
                        alt={pokemon.englishName}
                        className="w-32 h-32 mx-auto"
                    /> */}
                    {/* <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.nationalNumber}.png`}
                        alt={pokemon.englishName}
                        className="w-32 h-32 mx-auto"
                    /> */}
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.nationalNumber}.gif`}
                        alt={pokemon.englishName}
                        className="w-32 h-32 mx-auto"
                    />
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokemon.nationalNumber}.gif`}
                        alt={pokemon.englishName}
                        className="w-32 h-32 mx-auto"
                    />
                </div>

                <div className="mx-auto">
                    <div className="grid grid-cols-2 gap-4">
                        <p className="capitalize"><strong>Type:</strong> {pokemon.primaryType}{pokemon.secondaryType ? `, ${pokemon.secondaryType}` : ""}</p>
                        <p><strong>Height:</strong> {pokemon.heightM}m</p>
                        <p><strong>Weight:</strong> {pokemon.weightKg}kg</p>
                        <p><strong>Abilities:</strong> {pokemon.abilities0}</p>
                    </div>

                    <h3 className="-mx-16 my-5 text-lg font-semibold">Base Stats</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>HP:</strong> {pokemon.hp}</p>
                        <p><strong>Attack:</strong> {pokemon.attack}</p>
                        <p><strong>Defense:</strong> {pokemon.defense}</p>
                        <p><strong>Sp. Attack:</strong> {pokemon.spAttack}</p>
                        <p><strong>Sp. Defense:</strong> {pokemon.spDefense}</p>
                        <p><strong>Speed:</strong> {pokemon.speed}</p>
                    </div>
                </div>
                <Link
                    to="/pokemons/$pokemon"
                    params={{ pokemon: pokemon.englishName }}
                >
                    <Button
                        onClick={onClose}
                        className="block w-full h-full cursor-pointer"
                    >
                        More details...
                    </Button>
                </Link>
            </DialogContent>
        </Dialog>
    );
};