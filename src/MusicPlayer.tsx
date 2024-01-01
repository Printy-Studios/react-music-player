import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import useMusicPlayer from './useMusicPlayer'
import IconButton from './IconButton';
import TimeDisplay from './TimeDisplay';

export default function MusicPlayer() {

    const musicPlayer = useMusicPlayer();

    const [sliderValue, setSliderValue] = useState(0);
    const [isSliderActive, setIsSliderActive] = useState(false);

    const [currentTime, setCurrentTime] = useState({minutes: 0, seconds: 0});
    const [maxTime, setMaxTime] = useState({minutes: 0, seconds: 0});

    const onPlayButtonClick = () => {
        console.log('ddd')
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
        const new_time = musicPlayer.maxTime * sliderValue / 100
        musicPlayer.updateTime(new_time)
        setIsSliderActive(false);
    }

    useEffect(() => {
        if(!isSliderActive) {
            setSliderValue(musicPlayer.currentTime);
        }
    }, [musicPlayer.currentTime])

    return (
        <div className='music-player'>
            <IconButton
                onClick={onPrevButtonClick}
                src={'icons/prev.svg'}
            />
            <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
            <TimeDisplay time={currentTime} />
            <input 
                type="range" 
                min="1" 
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
    )

}