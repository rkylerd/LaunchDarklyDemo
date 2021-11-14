import React, { FC, useState } from 'react'
import { Card, ExplicitContainer, NameAndArtist, PlayingIndicator } from '../tags';
import { AlbumArtwork } from './tags';
import { SongDisplayProps } from '..';
import Options from '../../Options';

const SongCard: FC<SongDisplayProps> = ({ song, setPlaying, isPlaying, addToUpNextQueue, withOptions }) => {
    const { artworkUrl60, trackName, artistName, trackExplicitness } = song;
    const [isHovered, setHovered] = useState<boolean>(false);

    return (
        <Card>
            <div style={{ display: 'flex' }}>
                <AlbumArtwork
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    isPlaying={isPlaying}
                    isHovered={isHovered}
                    artwork={artworkUrl60}
                    onClick={({ currentTarget }) => setPlaying(song, currentTarget)}>
                    <PlayingIndicator />
                </AlbumArtwork>

                <div style={{ width: '100%' }}>
                    {withOptions && <Options style={{ marginLeft: 'auto' }}>
                        <li onClick={() => addToUpNextQueue(song)}>Add to Up Next</li>
                        <li onClick={() => window.alert("Psych! Can't believe you thought that would work.")}>Download (free)</li>
                    </Options>}
                    <span style={{ margin: 'auto', textAlign: 'center' }}>
                        {trackExplicitness === 'explicit' && <ExplicitContainer>E</ExplicitContainer>}
                    </span>
                </div>
            </div>

            <NameAndArtist>
                <span><strong>{trackName}</strong></span>
                <span >{artistName}</span>
            </NameAndArtist>
        </Card >
    )
}

export default SongCard;