import { faBackward, faCaretLeft, faCaretRight, faForward, faList, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChangeEventHandler, FC, useContext, useState } from 'react'
import { FeatureFlagContext } from '../../contexts/featureFlags';
import SoundPlayerContext from '../../contexts/soundPlayer';
import { useFlagFunctions } from '../../hooks';
import { Song } from '../../types/song';
import { millisToMinutesAndSeconds, playSound } from '../../utils/sounds';
import Icon from '../Icon';
import Options from '../Options';
import { FlexContainer, MusicPlayer, MusicPlayerWrapper } from './tags';

const GlobalSoundPlayer: FC = (): JSX.Element | null => {
    const { flags } = useContext(FeatureFlagContext);
    const { isFlagEnabled } = useFlagFunctions(flags);
    const isAudioPlayerEnabled = isFlagEnabled("global-audio-player", true);

    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const [isHidden, setIsPlayerHidden] = useState<boolean>(false);

    const updateTimeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { currentTarget: { value = '0' } = {} } = e;
        soundData.soundPlayer && (soundData.soundPlayer.currentTime = parseInt(value));
    };

    const playNext = () => {
        const nextSong = soundData.upNextQueue?.[0];
        const newSoundData = {
            ...soundData,
            upNextQueue: soundData.upNextQueue.slice(1),
        };
        setSoundData(newSoundData);
        playSound(newSoundData, setSoundData)(nextSong);
    };

    return isAudioPlayerEnabled && soundData.song ? (
        <MusicPlayerWrapper className={isHidden ? "hidden" : ""}>
            <MusicPlayer >
                <div id="caret">
                    <Icon icon={isHidden ? faCaretLeft : faCaretRight} onClick={() => setIsPlayerHidden(!isHidden)} />
                </div >
                <FlexContainer>
                    <Options OptionsDisplayElement={
                        <img src={soundData.song?.artworkUrl30 || ""} alt="Album artwork of song that's playing" style={{ margin: "auto" }} />
                    }>
                        {[soundData.song, ...soundData.upNextQueue].map(({ trackName }: Song, idx) => <li key={trackName + idx}>
                            {trackName}
                        </li>)}
                    </Options>
                </FlexContainer>
                <FlexContainer id="buttons">
                    <div>
                        {/* @ts-ignore - the destructuring and default value of '0' gets around the type mismatch */}
                        <Icon color={"#292b2c"} icon={faBackward} onClick={updateTimeHandler} />
                    </div>
                    <div>
                        <Icon color={"#292b2c"} icon={soundData.isPlaying ? faPause : faPlay} onClick={() => {
                            if (!soundData.soundPlayer) return;

                            if (soundData.isPlaying) {
                                soundData.soundPlayer?.pause()
                            } else {
                                soundData.soundPlayer?.play()
                            }
                            setSoundData(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
                        }} />
                    </div>

                    <div>
                        <Icon color="#292b2c" icon={faForward} onClick={playNext} />
                    </div>
                </FlexContainer >
                <div id="slider">
                    <span>
                        {millisToMinutesAndSeconds((soundData?.currentTimeOfSong || 0) * 1000).timeStr}
                    </span>
                    <input
                        type="range"
                        min={0}
                        onChange={updateTimeHandler}
                        value={soundData?.currentTimeOfSong || 0}
                        max={30} />
                    <span>
                        {"0:30"}
                    </span>
                </div>
            </MusicPlayer >
        </MusicPlayerWrapper>
    ) : null;
};

export default GlobalSoundPlayer;