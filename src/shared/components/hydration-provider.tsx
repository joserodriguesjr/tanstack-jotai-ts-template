import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';

import Loading from '@/shared/components/loading';
import { themeAtom } from '@/shared/hooks/use-theme';

// TODO: Remover se possivel
const HydrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const theme = useAtomValue(themeAtom);

  useEffect(() => {
    if (theme !== undefined) {
      setHasHydrated(true);
    }
  }, [theme]);

  if (!hasHydrated) return <Loading />;

  return <>{children} </>;
};

export default HydrationProvider;
