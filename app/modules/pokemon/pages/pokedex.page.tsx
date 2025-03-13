import { PokedexList } from "@/modules/pokemon/components/PokedexList";
import { PokemonModal } from "../components/PokemonModal";

export function PokedexPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PokedexList />
      <PokemonModal />
    </div>
  );
}
