import { Skeleton } from '@/shared/components/ui/skeleton';

export const PokemonHeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        {/* Logo */}
        <Skeleton className="h-8 w-32" />

        {/* Botão de reload */}
        <Skeleton className="h-8 w-8 rounded-full" />

        {/* Troca de idioma */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {/* Troca de tema */}
        <Skeleton className="h-8 w-8 rounded-full" />

        {/* Barra de pesquisa */}
        <Skeleton className="h-10 w-48 rounded-md" />

        {/* Menu desktop */}
        <nav className="hidden gap-6 md:flex">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </nav>

        {/* Menu mobile (hambúrguer) */}
        <Skeleton className="h-8 w-8 rounded-full md:hidden" />
      </div>
    </header>
  );
};
