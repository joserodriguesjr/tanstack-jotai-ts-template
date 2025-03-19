import { z } from 'zod';

export const PokemonSchema = z.object({
  nationalNumber: z.number(),
  gen: z.string(),
  englishName: z.string(),
  japaneseName: z.string(),
  primaryType: z.string(),
  secondaryType: z.string().nullable(),
  classification: z.string(),
  percentMale: z.string().nullable(),
  percentFemale: z.string().nullable(),
  heightM: z.number(),
  weightKg: z.number(),
  captureRate: z.string(),
  baseEggSteps: z.number(),
  hp: z.number(),
  attack: z.number(),
  defense: z.number(),
  spAttack: z.number(),
  spDefense: z.number(),
  speed: z.number(),
  abilities0: z.string(),
  abilities1: z.string().nullable(),
  abilities2: z.string().nullable(),
  abilitiesHidden: z.string().nullable(),
  againstNormal: z.number(),
  againstFire: z.number(),
  againstWater: z.number(),
  againstElectric: z.number(),
  againstGrass: z.number(),
  againstIce: z.number(),
  againstFighting: z.number(),
  againstPoison: z.number(),
  againstGround: z.number(),
  againstFlying: z.number(),
  againstPsychic: z.number(),
  againstBug: z.number(),
  againstRock: z.number(),
  againstGhost: z.number(),
  againstDragon: z.number(),
  againstDark: z.number(),
  againstSteel: z.number(),
  againstFairy: z.number(),
  isSublegendary: z.number(),
  isLegendary: z.number(),
  isMythical: z.number(),
  evochain0: z.string().nullable(),
  evochain1: z.string().nullable(),
  evochain2: z.string().nullable(),
  evochain3: z.string().nullable(),
  evochain4: z.string().nullable(),
  evochain5: z.string().nullable(),
  evochain6: z.string().nullable(),
  gigantamax: z.string().nullable(),
  megaEvolution: z.string().nullable(),
  megaEvolutionAlt: z.string().nullable(),
  description: z.string(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export interface PokemonDTO {
  content: Pokemon[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
