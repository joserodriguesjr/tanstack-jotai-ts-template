import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  hasMore: boolean;
  isFetching: boolean;
  searchQuery: string;
}

export const useInfiniteScroll = ({
  onIntersect,
  hasMore,
  isFetching,
  searchQuery,
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current || isFetching || searchQuery !== "") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onIntersect();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [onIntersect, hasMore, isFetching, searchQuery]);

  return { loadMoreRef };
};
