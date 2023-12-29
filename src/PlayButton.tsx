import { useState } from 'react'
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

type PlayButtonProps = {
    playing: boolean
}

export default function PlayButton({ playing }: PlayButtonProps) {

    const [currentIcon, setCurrentIcon] = useState<'play' | 'pause'>(playing ? 'pause' : 'play');

    return (
        <>
            {
                currentIcon == 'play' ? 
                <PlayIcon /> : 
                <PauseIcon />
            }
        </>
    )
        
    
}