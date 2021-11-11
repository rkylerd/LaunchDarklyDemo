import React, { FC, useState } from 'react'
import { AlbumArtwork, NameAndArtist, SongInfo, Track, ExplicitContainer, PlayingIndicator } from '../tags';
import { SongDisplayProps } from '..';

const SongTile: FC<SongDisplayProps> = ({ song, setPlaying, isPlaying }) => {
    const { artworkUrl60, trackName, artistName, trackExplicitness } = song;
    const [isHovered, setHovered] = useState<boolean>(false);

    return (
        <Track>
            <AlbumArtwork
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                isPlaying={isPlaying}
                isHovered={isHovered}
                artwork={artworkUrl60}
                onClick={({ currentTarget }) => setPlaying(song, currentTarget)}>
                <PlayingIndicator />
            </AlbumArtwork>

            <SongInfo>
                <NameAndArtist>
                    <span><strong>{trackName}</strong></span>
                    <span >{artistName}</span>
                </NameAndArtist>

                <div>
                    {trackExplicitness === 'explicit' && <ExplicitContainer>E</ExplicitContainer>}
                </div>

            </SongInfo>
        </Track>
    );
};

export default SongTile;