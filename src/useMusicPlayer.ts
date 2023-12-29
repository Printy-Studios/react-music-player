import { useEffect, useRef, useState } from 'react';

export default function useMusicPlayer() {

    const audio = useRef(document.createElement('audio'));

    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState("");
    const [currentTime, setCurrentTime] = useState(0);
    const [maxTime, setMaxTime] = useState(0);

    useEffect(() => {
        console.log('abc')
        audio.current.preload = 'metadata';
        
        audio.current.onloadedmetadata = () => {
            setMaxTime(audio.current.duration)
        }

        setSrc('songs/1.wav')
    }, [])

    useEffect(() => {
        audio.current.src = src;
        console.log(src)
        console.log(audio.current.duration);
        setMaxTime(audio.current.duration)
    }, [src])

    useEffect(() => {
        audio.current.currentTime = currentTime;
    }, [currentTime])

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
        setIsPlaying,
        setCurrentTime,
        currentTime,
        maxTime
    }
}