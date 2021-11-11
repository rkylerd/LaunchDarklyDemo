type FlagFunctions = {
    isFlagEnabled: (name: string, defaultValue?: boolean) => boolean;
    getFlagVariant: (name: string, defaultValue?: number) => number;
};
export type FlagSet = Record<string, boolean | number>;

export const useFlagFunctions = (flags: FlagSet): FlagFunctions => ({
    isFlagEnabled: (name: string, defaultValue = false) => (
        flags[name] !== undefined ? flags[name] as boolean : defaultValue
    ),
    getFlagVariant: (name: string, defaultValue = 1) => (
        flags[name] !== undefined ? flags[name] as number : defaultValue
    )
});