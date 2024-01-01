import { usePersistState } from '@printy/react-persist-state';
import { useEffect, useRef, useState } from 'react';

export default function useMusicPlayer() {

    const audio = useRef(document.createElement('audio'));

    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState("");
    //setCurrentTime is for local use only, for setting time use updateTime
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [updatedTime, updateTime] = useState(0);
    // const [storedTime, setStoredTime] = usePersistState<number>(0, 'stored_time');

    const initialLoad = useRef(true);
    
    const [maxTime, setMaxTime] = useState(0);

    const timeUpdateDeltaSum = useRef(0);

    useEffect(() => {
        audio.current.preload = 'metadata';
        
        audio.current.ondurationchange = () => {
            setMaxTime(audio.current.duration)
        }

        audio.current.onended = () => {
            setIsPlaying(false);
        }

        audio.current.ontimeupdate = () => {
            //timeUpdateDeltaSum.current += audio.current.currentTime - currentTime;
            //if(timeUpdateDeltaSum.current > )
            setCurrentTime(audio.current.currentTime)
        }
    }, [])

    useEffect(() => {
        audio.current.src = src;
        updateTime(0);
        initialLoad.current = false;
        
        if(isPlaying) {
            audio.current.play();
        }
    }, [src])

    useEffect(() => {
        audio.current.currentTime = updatedTime;
        setCurrentTime(updatedTime);
    }, [updatedTime])

    useEffect(() => {
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
        updateTime,
        maxTime,
        setSrc
    }
}