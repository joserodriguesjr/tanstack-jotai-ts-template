import { forwardRef } from 'react';

import { Card, CardContent } from '@/components/card';
import { useTranslate } from '@/lib/i18n';

interface PokemonCardProps {
  nationalNumber: number;
  englishName: string;
  primaryType: string;
  secondaryType: string | null;
  onClick: () => void;
}

export const PokemonCard = forwardRef<HTMLDivElement, PokemonCardProps>(
  (
    { nationalNumber, englishName, primaryType, secondaryType, onClick },
    ref,
  ) => {
    const { translator } = useTranslate();
    const translateType = (type: string | null) =>
      type ? translator({ path: `pokemons.types.${type}` }) : '';

    return (
      <Card
        ref={ref}
        onClick={onClick}
        className="flex cursor-pointer flex-col items-center p-4 transition-shadow hover:shadow-lg"
      >
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${nationalNumber}.png`}
          alt={englishName}
          className="h-24 w-24"
        />
        <CardContent className="text-center">
          <h2 className="text-base font-semibold capitalize">
            {englishName} #{nationalNumber}
          </h2>
          <p className="text-sm text-gray-500 capitalize">
            {[translateType(primaryType), translateType(secondaryType)]
              .filter(Boolean)
              .join(', ')}
          </p>
        </CardContent>
      </Card>
    );
  },
);

PokemonCard.displayName = 'PokemonCard';
