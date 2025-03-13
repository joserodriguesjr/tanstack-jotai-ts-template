import { useAtom } from "jotai";
import { searchAtom } from "@/modules/pokemon/atoms/search.atom";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const [search, setSearch] = useAtom(searchAtom);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim().toLowerCase();
    setSearch(text);
  };

  return (
    <Input
      type="text"
      placeholder="Search Pokémon..."
      className="mx-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
      value={search}
      onChange={(e) => handleTextInput(e)}
    />
  );
};

export default SearchInput;
