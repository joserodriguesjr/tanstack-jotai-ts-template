import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core"

export const pokemons = sqliteTable("pokemons", {
	nationalNumber: integer("national_number"),
	gen: text(),
	englishName: text("english_name"),
	japaneseName: text("japanese_name"),
	primaryType: text("primary_type"),
	secondaryType: text("secondary_type"),
	classification: text(),
	percentMale: text("percent_male"),
	percentFemale: text("percent_female"),
	heightM: real("height_m"),
	weightKg: real("weight_kg"),
	captureRate: text("capture_rate"),
	baseEggSteps: integer("base_egg_steps"),
	hp: integer(),
	attack: integer(),
	defense: integer(),
	spAttack: integer("sp_attack"),
	spDefense: integer("sp_defense"),
	speed: integer(),
	abilities0: text("abilities_0"),
	abilities1: text("abilities_1"),
	abilities2: text("abilities_2"),
	abilitiesHidden: text("abilities_hidden"),
	againstNormal: real("against_normal"),
	againstFire: real("against_fire"),
	againstWater: real("against_water"),
	againstElectric: real("against_electric"),
	againstGrass: real("against_grass"),
	againstIce: real("against_ice"),
	againstFighting: real("against_fighting"),
	againstPoison: real("against_poison"),
	againstGround: real("against_ground"),
	againstFlying: real("against_flying"),
	againstPsychic: real("against_psychic"),
	againstBug: real("against_bug"),
	againstRock: real("against_rock"),
	againstGhost: real("against_ghost"),
	againstDragon: real("against_dragon"),
	againstDark: real("against_dark"),
	againstSteel: real("against_steel"),
	againstFairy: real("against_fairy"),
	isSublegendary: integer("is_sublegendary"),
	isLegendary: integer("is_legendary"),
	isMythical: integer("is_mythical"),
	evochain0: text("evochain_0"),
	evochain1: text("evochain_1"),
	evochain2: text("evochain_2"),
	evochain3: text("evochain_3"),
	evochain4: text("evochain_4"),
	evochain5: text("evochain_5"),
	evochain6: text("evochain_6"),
	gigantamax: text(),
	megaEvolution: text("mega_evolution"),
	megaEvolutionAlt: text("mega_evolution_alt"),
	description: text(),
});

