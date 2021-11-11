import React, { FC, useState } from 'react'
import { Card, NameAndArtist, PlayingIndicator } from '../tags';
import { AlbumArtwork } from './tags';
import { SongDisplayProps } from '..';

const SongCard: FC<SongDisplayProps> = ({ song, setPlaying, isPlaying }) => {
    const { artworkUrl60, trackName, artistName } = song;
    const [isHovered, setHovered] = useState<boolean>(false);

    return (
        <Card>
            <div className="fav-num-container">
                <div className="fav-num small-font">
                    {/* <span>{displayNum}</span> */}
                </div>
            </div>

            <AlbumArtwork
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                isPlaying={isPlaying}
                isHovered={isHovered}
                artwork={artworkUrl60}
                onClick={({ currentTarget }) => setPlaying(song, currentTarget)}>
                <PlayingIndicator />
            </AlbumArtwork>

            <NameAndArtist>
                <span><strong>{trackName}</strong></span>
                <span >{artistName}</span>
            </NameAndArtist>
        </Card >
    )
}

export default SongCard;