import { Card, CardContent } from "@/features/ui/card"
import { forwardRef } from "react"

interface PokemonCardProps {
  nationalNumber: number
  englishName: string,
  primaryType: string,
  secondaryType: string | null,
  onClick: () => void,
}

export const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ nationalNumber, englishName, primaryType, secondaryType, onClick }, ref) => {
    return (
      <Card
        ref={ref}
        onClick={onClick}
        className="p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nationalNumber}.png`}
          alt={englishName}
          className="w-24 h-24"
        />
        <CardContent className="text-center">
          <h2 className="text-base font-semibold capitalize">
            {englishName} #{nationalNumber}
          </h2>
          <p className="text-sm text-gray-500 capitalize">
            {[primaryType, secondaryType].filter(Boolean).join(", ")}
          </p>
        </CardContent>
      </Card>
    );
  }
);

PokemonCard.displayName = "PokemonCard"; 