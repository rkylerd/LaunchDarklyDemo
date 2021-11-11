import React, { FC, useContext } from 'react'
import { FlexContainer, Wrapper } from './tags';
import { Song } from '../../types/song';
import SoundPlayerContext from '../../contexts/soundPlayer';
import { playSound } from '../../utils/sounds';
import SongTile from './Tile';
import SongCard from './Card';
import { FlagSet, useFlagFunctions } from '../../hooks';

export type SongDisplayProps = {
    song: Song;
    setPlaying: (song: Song, soundData: HTMLDivElement & EventTarget) => void;
    isPlaying: boolean;
};

type SongListProps = {
    songs: Song[];
    flags: FlagSet;
};

const SongList: FC<SongListProps> = ({ songs, flags }) => {
    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const { song: { trackId: idOfPlaying = null } = {} } = soundData;
    const setPlaying = playSound(soundData, setSoundData);

    const { isFlagEnabled } = useFlagFunctions(flags);
    const isCardSongCompEnabled = isFlagEnabled("vertical-search-results");
    const SongElement = isCardSongCompEnabled ? SongCard : SongTile;

    return <Wrapper>
        <FlexContainer withColumns={!isCardSongCompEnabled}>
            {songs.map(song => (
                <SongElement
                    key={song.trackId}
                    song={song}
                    isPlaying={song.trackId === idOfPlaying}
                    setPlaying={setPlaying} />
            ))}
        </FlexContainer>
    </Wrapper>
};

export default SongList;