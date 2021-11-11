import { createContext, Dispatch, FC, RefObject, SetStateAction, useState } from "react";
import { Song } from "../types/song";

export type SoundData = {
    isPlaying: boolean;
    soundPlayer: HTMLAudioElement | null;
    song?: Song;
};

export const SoundPlayerContext = createContext<{ soundData: SoundData; setSoundData: Dispatch<SetStateAction<SoundData>> }>({
    soundData: {
        isPlaying: false,
        song: undefined,
        soundPlayer: null,
    },
    setSoundData: () => null
});

export const SoundPlayerProvider: FC<{ soundData?: SoundData }> = ({ children, soundData: { isPlaying = false, song, soundPlayer = null } = {} }) => {
    const [soundData, setSoundData] = useState<SoundData>({ isPlaying, song, soundPlayer });
    return (
        <SoundPlayerContext.Provider value={{ soundData, setSoundData }} >
            {children}
        </SoundPlayerContext.Provider>
    );
};

export default SoundPlayerContext;

