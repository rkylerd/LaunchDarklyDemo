import React, { FC, useContext } from 'react'
import { FlexContainer, Wrapper } from './tags';
import { Song } from '../../types/song';
import SoundPlayerContext from '../../contexts/soundPlayer';
import { playSound } from '../../utils/sounds';
import SongTile from './Tile';
import SongCard from './Card';
import { useFlagFunctions } from '../../hooks';
import { FeatureFlagContext } from '../../contexts/featureFlags';

export type SongDisplayProps = {
    song: Song;
    setPlaying: (song: Song, soundData: HTMLDivElement & EventTarget) => void;
    addToUpNextQueue: (song: Song) => void;
    isPlaying: boolean;
    withOptions: boolean;
};

type SongListProps = {
    songs: Song[];
};

const SongList: FC<SongListProps> = ({ songs }) => {
    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const { flags } = useContext(FeatureFlagContext);
    const { isPlaying, song: { trackId: idOfPlaying = null } = {} } = soundData;

    const setPlaying = playSound(soundData, setSoundData);
    const addToPlayNextQueue = (song: Song) =>
        setSoundData(prev => ({
            ...prev,
            upNextQueue: [...prev.upNextQueue, song],
        }));

    const { isFlagEnabled } = useFlagFunctions(flags);
    const areSongOptionsShown = isFlagEnabled("songs-with-options");
    const isCardSongCompEnabled = isFlagEnabled("vertical-search-results");
    const SongElement = isCardSongCompEnabled ? SongCard : SongTile;

    return <Wrapper>
        <FlexContainer withColumns={!isCardSongCompEnabled}>
            {songs.map(song => (
                <SongElement
                    key={song.trackId}
                    song={song}
                    isPlaying={isPlaying && song.trackId === idOfPlaying}
                    addToUpNextQueue={addToPlayNextQueue}
                    setPlaying={setPlaying}
                    withOptions={areSongOptionsShown} />
            ))}
        </FlexContainer>
    </Wrapper>
};

export default SongList;