import { Dispatch, SetStateAction } from "react";
import { SoundData } from "../contexts/soundPlayer";
import { Song } from "../types/song";

export const millisToMinutesAndSeconds = (millis: number) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return {
        seconds: millis / 1000,
        timeStr: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };
}

export const playSound = (soundData: SoundData, setSoundData: Dispatch<SetStateAction<SoundData>>) =>
    (song: Song): void => {
        const { trackId = "", previewUrl = "" } = song || {};
        if (!trackId) {
            return;
        }

        // First, pause whatever is playing, if anything
        soundData.soundPlayer?.pause();

        // Is the user trying to stop the currently playing song?
        if (soundData.song?.trackId === trackId) {
            setSoundData(prev => ({
                song: undefined,
                upNextQueue: prev.upNextQueue,
                isPlaying: false,
                soundPlayer: null,
                currentTimeOfSong: 0
            }));
            return;
        }

        let audioPlayer = new Audio(previewUrl);

        // When the song stops on its own, reset state 
        audioPlayer.addEventListener('ended', () => {
            let nextSong;
            let newSoundData;
            setSoundData(prev => {
                nextSong = prev.upNextQueue?.[0];
                newSoundData = {
                    song: undefined,
                    isPlaying: false,
                    upNextQueue: prev.upNextQueue.slice(1),
                    currentTimeOfSong: 0,
                    soundPlayer: null
                }
                return newSoundData;
            });
            // @ts-ignore - complains because nextSong and newSoundData are lazily initialized
            playSound(newSoundData, setSoundData)(nextSong);
        });

        // anytime song is paused, update it's play/stop icons
        audioPlayer.addEventListener('pause', () => {
            setSoundData((prevState) => ({
                ...prevState,
                isPlaying: false
            }));
        });

        // update the global player's song progress indicator
        // @ts-ignore - I have no idea what the right type is for this thing
        audioPlayer.addEventListener('timeupdate', ({ currentTarget: { currentTime = 0 } } = {}) => {
            setSoundData(prev => {
                const currentTimeOfSong = Math.floor(currentTime);
                if (currentTimeOfSong === prev.currentTimeOfSong) return prev;

                return {
                    ...prev,
                    currentTimeOfSong
                }
            });
        });

        // on play, swap the play icon for a stop icon
        audioPlayer.addEventListener('play', () => {
            setSoundData(prev => ({
                ...prev,
                isPlaying: true,
                song,
                soundPlayer: audioPlayer
            }));
        });

        audioPlayer.play();
    };