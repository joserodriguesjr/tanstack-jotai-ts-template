import type { UseMutationOptions, DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
      networkMode: "offlineFirst",
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    // throwOnError: true,
    // refetchOnWindowFocus: false,
    // retry: false,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<TQueryFn extends (...args: any[]) => any> = Partial<
  Awaited<ReturnType<TQueryFn>>
  // 'queryKey' | 'queryFn'
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;