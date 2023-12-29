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
        <div>
            <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
        </div>
    )

}