import { Dispatch, SetStateAction } from "react";
import { SoundData } from "../contexts/soundPlayer";
import { Song } from "../types/song";

export const playSound = (soundData: SoundData, setSoundData: Dispatch<SetStateAction<SoundData>>) =>
    (song: Song): void => {
        const { trackId = "", previewUrl = "" } = song;
        if (!trackId) {
            return;
        }

        // First, pause whatever is playing
        if (soundData.isPlaying) {
            soundData.soundPlayer?.pause();

            // Is the user trying to stop the currently playing song?
            if (soundData.song?.trackId === trackId) {
                setSoundData({
                    isPlaying: false,
                    song: undefined,
                    soundPlayer: null
                });
                return;
            }
        }

        let audioPlayer = new Audio(previewUrl);

        // When the song stops on its own, reset state 
        audioPlayer.addEventListener('ended', () => {
            setSoundData({
                isPlaying: false,
                song: undefined,
                soundPlayer: null
            });
        });

        // anytime song is paused, update it's play/stop icons
        audioPlayer.addEventListener('pause', () => {
            setSoundData((prevState) => ({
                ...prevState,
                isPlaying: false
            }));
        });

        // on play, swap the play icon for a stop icon
        audioPlayer.addEventListener('play', () => {
            setSoundData({
                isPlaying: true,
                song,
                soundPlayer: audioPlayer
            });
        });

        audioPlayer.play();
    };