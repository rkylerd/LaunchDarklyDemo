import { createContext, FC } from "react";
import { FlagSet } from "../hooks";

type FeatureFlagContextType = { flags: FlagSet; };
export const FeatureFlagContext = createContext<FeatureFlagContextType>({
    flags: {}
});

export const FeatureFlagProvider: FC<FeatureFlagContextType> = ({ flags, children }) => (
    <FeatureFlagContext.Provider value={{ flags }}>
        {children}
    </FeatureFlagContext.Provider>
);