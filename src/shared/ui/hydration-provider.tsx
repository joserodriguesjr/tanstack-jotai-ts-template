import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';

import { themeAtom } from '@/shared/hooks/use-theme';
import Loading from '@/shared/ui/loading';

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
