import React, { FC, useState } from 'react'
import { AlbumArtwork, NameAndArtist, SongInfo, Track, ExplicitContainer, PlayingIndicator } from '../tags';
import { SongDisplayProps } from '..';
import Options from '../../Options';

const SongTile: FC<SongDisplayProps> = ({ song, setPlaying, isPlaying, addToUpNextQueue, withOptions }) => {
    const { artworkUrl60, trackName, artistName, trackExplicitness } = song;
    const [isHovered, setHovered] = useState<boolean>(false);

    return (
        <Track>
            <AlbumArtwork
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onBlur={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                tabIndex={1}
                onKeyPress={(e) => e.currentTarget.click()}
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

                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {withOptions && <Options style={{ margin: '2px auto' }}>
                        <li tabIndex={1} onKeyPress={(e) => e.currentTarget.click()} onClick={() => addToUpNextQueue(song)}>Add to Up Next</li>
                        <li tabIndex={1} onKeyPress={(e) => e.currentTarget.click()} onClick={() => window.alert("Psych! Can't believe you thought that would work.")}>Download (free)</li>
                    </Options>}
                    <span style={{ margin: 'auto' }}>
                        {trackExplicitness === 'explicit' && <ExplicitContainer>E</ExplicitContainer>}
                    </span>
                </div>

            </SongInfo>
        </Track>
    );
};

export default SongTile;