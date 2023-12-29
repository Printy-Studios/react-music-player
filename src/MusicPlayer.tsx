import { useState } from 'react'
import PlayButton from './PlayButton'
import useMusicPlayer from './useMusicPlayer'

export default function MusicPlayer() {

    const musicPlayer = useMusicPlayer();

    const onPlayButtonClick = () => {
        console.log('ddd')
        musicPlayer.setIsPlaying(!musicPlayer.isPlaying)
    }

    return (
        <div className='music-player'>
            
            <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
            <input type="range" min="1" max="100" defaultValue="50" className="slider"/>
        </div>
    )

}