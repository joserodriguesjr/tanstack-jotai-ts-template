import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { searchAtom } from "@/features/pokemons/pokemons-filters.atom";
import { useSetAtom } from "jotai";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/features/theme/theme.component";

export const PokemonHeader = () => {
    const setSearch = useSetAtom(searchAtom);
    const onChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), 350);

    return (
        <header className="bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link to="/" className="text-white text-2xl font-bold flex items-center gap-2">
                    {/* <img src="/pokeball.svg" alt="Pokeball" className="w-8 h-8" /> */}
                    PokéDex
                </Link>

                <ThemeToggle />

                {/* Barra de pesquisa */}
                <div className="hidden sm:flex items-center bg-gray-700 px-3 py-2 rounded-lg">
                    <Search className="text-white w-5 h-5 mr-2" />
                    <input
                        type="text"
                        placeholder="Search Pokémon..."
                        onChange={onChangeSearch}
                        className="bg-transparent outline-none text-white placeholder-gray-300"
                    />
                </div>

                {/* Menu desktop */}
                <nav className="hidden md:flex gap-6">
                    <Link to="/pokemons" className="text-white font-medium hover:underline">
                        Todos Pokémons
                    </Link>
                    <Link to="/pokemons/types" className="text-white font-medium hover:underline">
                        Tipos
                    </Link>
                    <Link to="/pokemons/about" className="text-white font-medium hover:underline">
                        Sobre
                    </Link>
                </nav>

                {/* Menu mobile */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden text-white">
                            ☰
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-gray-900 text-white p-6">
                        <nav className="flex flex-col gap-4">
                            <Link to="/pokemons" className="text-lg font-medium hover:underline">
                                Todos Pokémons
                            </Link>
                            <Link to="/pokemons/types" className="text-lg font-medium hover:underline">
                                Tipos
                            </Link>
                            <Link to="/pokemons/about" className="text-lg font-medium hover:underline">
                                Sobre
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};