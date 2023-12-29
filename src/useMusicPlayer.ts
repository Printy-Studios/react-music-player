import { useEffect, useRef, useState } from 'react';

export default function useMusicPlayer() {

    const audio = useRef(document.createElement('audio'));

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {

        audio.current.src = 'songs/1.wav';
    }, [])

    useEffect(() => {
        console.log('abc')
        console.log(isPlaying)
        if (isPlaying) {
            audio.current.play();
        } else {
            audio.current.pause();
        }
    }, [isPlaying])

    return {
        isPlaying,
        setIsPlaying
    }
}