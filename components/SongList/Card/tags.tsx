import styled from "styled-components";
import { AlbumArtwork as GenericAlbumArtwork, NameAndArtist as GenericNameAndArtist } from "../tags";

export const AlbumArtwork = styled(GenericAlbumArtwork)`
    margin: 0 auto;
    box-shadow: black 0 1px 3px;
`;

export const NameAndArtist = styled(GenericNameAndArtist)`
    width: 100%;
`;