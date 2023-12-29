import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import PlayButton from './PlayButton'
import useMusicPlayer from './useMusicPlayer'
import IconButton from './IconButton';

export default function MusicPlayer() {

    const musicPlayer = useMusicPlayer();

    const [sliderValue, setSliderValue] = useState(0);

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
    }

    const onSliderMouseUp = () => {
        const new_time = musicPlayer.maxTime * sliderValue / 100
        musicPlayer.setCurrentTime(new_time)
    }

    return (
        <div className='music-player'>
            <IconButton
                onClick={onPrevButtonClick}
                src={'icons/prev.svg'}
            />
            <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={sliderValue} 
                className="slider" 
                onMouseUp={onSliderMouseUp}
                onChange={onSliderChange}
                />
            <IconButton
                onClick={onPrevButtonClick}
                src={'icons/next.svg'}
            />
        </div>
    )

}