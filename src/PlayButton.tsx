import { useEffect, useState } from 'react'
import IconButton from './IconButton'
// import PlayIcon from 'icons/play.svg';
// import PauseIcon from 'pause.svg';


type PlayButtonProps = {
    playing: boolean,
    onClick: () => void,
}

export default function PlayButton({ onClick, playing }: PlayButtonProps) {

    return (
        <IconButton
            onClick={onClick}
            src={playing ? 'icons/pause.svg' : 'icons/play.svg'}
        />
    )
        
    
}