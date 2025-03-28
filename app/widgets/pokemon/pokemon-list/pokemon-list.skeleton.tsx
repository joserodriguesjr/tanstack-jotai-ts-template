import { Skeleton } from '@/shared/components/ui/skeleton';

export function PokemonListSkeleton() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 p-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 36 }).map((_, index) => (
        <div key={index} className="space-y-4">
          {/* Pokemon Card Skeleton */}
          <Skeleton className="h-48 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}
