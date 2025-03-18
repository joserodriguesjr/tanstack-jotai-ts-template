import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import Loading from "./Loading";
import { themeAtom } from "@/features/theme/theme.atom";

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