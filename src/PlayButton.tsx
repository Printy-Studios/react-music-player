import { useEffect, useState } from 'react'
// import PlayIcon from 'icons/play.svg';
// import PauseIcon from 'pause.svg';


type PlayButtonProps = {
    playing: boolean,
    onClick: () => void,
}

export default function PlayButton({ onClick, playing }: PlayButtonProps) {

    return (
        <div
            onClick={onClick}
        >
            {
                playing ? 
                <img className='icon' src={'icons/pause.svg'} /> : 
                <img className='icon' src={'icons/play.svg'} />
            }
        </div>
    )
        
    
}