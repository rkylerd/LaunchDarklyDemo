import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { Song } from "../types/song";

export type SoundData = {
    isPlaying: boolean;
    song?: Song;
    currentTimeOfSong: number;
    soundPlayer: HTMLAudioElement | null;
    upNextQueue: Song[];
};

export const SoundPlayerContext = createContext<{ soundData: SoundData; setSoundData: Dispatch<SetStateAction<SoundData>> }>({
    soundData: {
        isPlaying: false,
        song: undefined,
        currentTimeOfSong: 0,
        upNextQueue: [],
        soundPlayer: null,
    },
    setSoundData: () => null
});

export const SoundPlayerProvider: FC<{ soundData?: SoundData }> = ({ children, soundData: { isPlaying = false, currentTimeOfSong = 0, song, upNextQueue = [], soundPlayer = null } = {} }) => {
    const [soundData, setSoundData] = useState<SoundData>({ isPlaying, song, upNextQueue, soundPlayer, currentTimeOfSong });
    return (
        <SoundPlayerContext.Provider value={{ soundData, setSoundData }} >
            {children}
        </SoundPlayerContext.Provider>
    );
};

export default SoundPlayerContext;

