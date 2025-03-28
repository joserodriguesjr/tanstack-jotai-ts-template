import { Skeleton } from '@/shared/components/ui/skeleton';

export const PokemonHeaderSkeleton = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Skeleton className="h-8 w-full" />
      </div>
    </header>
  );
};
