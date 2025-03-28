import { useSetAtom } from 'jotai';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';

import { searchAtom } from '@/features/pokemon/search-pokemon/model';
import { useI18n } from '@/shared/hooks/use-i18n';

export function SearchPokemon() {
  const { translator } = useI18n();

  const setSearch = useSetAtom(searchAtom);
  const onChangeSearch = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    350,
  );

  return (
    <div className="hidden items-center rounded-lg bg-gray-700 px-3 py-2 sm:flex">
      <Search className="mr-2 h-5 w-5 text-white" />
      <input
        type="text"
        placeholder={translator('pokemons.header.searchBar')}
        onChange={onChangeSearch}
        className="bg-transparent text-white placeholder-gray-300 outline-none"
      />
    </div>
  );
}
