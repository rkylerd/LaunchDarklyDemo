import styled, { css } from 'styled-components'

export const Track = styled.div`
    border-top: #292b2c 1px solid; 
    max-width: 220px;
    display: flex;
`;

export const PlayingIndicator = styled.div``;

export const AlbumArtwork = styled.div<{ artwork: string; isPlaying: boolean; isHovered: boolean; }>`
    background: no-repeat;
    height: 60px;
    width: 60px;
    min-width: 60px;
    background: url(${({ artwork }) => artwork});
    display: flex;

    ${({ isHovered, isPlaying }) => !isPlaying && isHovered && css`
        ${PlayingIndicator} {
            cursor: pointer;
            background: url(https://www.wisc-online.com/asset-repository/getfile?id=414&getType=view);
            width: 40px;
            height: 40px;
        }
    `}
    
    ${PlayingIndicator} {
        ${({ isPlaying }) => isPlaying && css`
            background: url(https://amnell9891.files.wordpress.com/2013/08/stop-normal-red-icon.png?w=150&h=150);
            width: 35px;
            height: 35px;
        `}

        margin: auto;
        background-size: contain;
    } 
`;


export const SongInfo = styled.div`
    display: flex;
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export const NameAndArtist = styled.div`
    min-width: 122px;
    padding-left: 3px;
    display: flex;
    flex-direction: column;
    span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
    }
    width: 80%;
`;

export const ExplicitContainer = styled.span`
    font-size: xx-small;
    color: red;
    border: 1px solid red;
    display: block;
    text-align: center;
    width: 10px;
`;

export const FlexContainer = styled.div<{ withColumns?: boolean; }>`
    display: flex;
    flex-wrap: wrap;
    ${({ withColumns }) => withColumns && css`
        flex-direction: column;
    `}
`;

export const Wrapper = styled.div`
    display: flex;
    margin: unset auto;
    flex-direction: row;
    height: 505px;
`;

export const Card = styled.div`
    border-top: 1px solid #292b2c;
    border-right: 1px solid #292b2c;
    width: 180px;
    padding: 5px;
    height: 112px;
`;