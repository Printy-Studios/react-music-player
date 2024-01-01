import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import useMusicPlayer from './useMusicPlayer'
import IconButton from './IconButton';
import TimeDisplay from './TimeDisplay';
import { percentOf, secondsToMinutesAndSeconds, numberToPercent } from './util';

export default function MusicPlayer() {

    const musicPlayer = useMusicPlayer();

    const [sliderValue, setSliderValue] = useState(0);
    const [isSliderActive, setIsSliderActive] = useState(false);

    const [currentTime, setCurrentTime] = useState({minutes: 0, seconds: 0});
    const [maxTime, setMaxTime] = useState({minutes: 0, seconds: 0});

    const onPlayButtonClick = () => {
        musicPlayer.setIsPlaying(!musicPlayer.isPlaying)
    }

    const onPrevButtonClick = () => {

    }

    const onNextButtonClick = () => {

    }

    const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.currentTarget.value));
        setIsSliderActive(true);
    }

    const onSliderMouseUp = () => {
        const new_time = percentOf(musicPlayer.maxTime, sliderValue);
        musicPlayer.updateTime(new_time)
        setIsSliderActive(false);
    }

    useEffect(() => {
        if(!isSliderActive) {
            setSliderValue(numberToPercent(musicPlayer.currentTime, musicPlayer.maxTime));
        }
        setCurrentTime(secondsToMinutesAndSeconds(musicPlayer.currentTime));
    }, [musicPlayer.currentTime])

    useEffect(() => {
        setMaxTime(secondsToMinutesAndSeconds(musicPlayer.maxTime));
    }, [musicPlayer.maxTime])

    return (
        <div className='music-player'>
            <div className='music-player-info'>
                <img />
                <h5>Song name</h5>
                <h6>Author</h6>
            </div>
            <div className='music-player-controls'>
                <IconButton
                    onClick={onPrevButtonClick}
                    src={'icons/prev.svg'}
                />
                <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
                <TimeDisplay time={currentTime} />
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue} 
                    className="slider" 
                    onMouseUp={onSliderMouseUp}
                    onChange={onSliderChange}
                />
                <TimeDisplay time={maxTime} />
                <IconButton
                    onClick={onPrevButtonClick}
                    src={'icons/next.svg'}
                />
            </div>
        </div>
    )

}