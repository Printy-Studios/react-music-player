import { usePersistState } from '@printy/react-persist-state';
import { useEffect, useRef, useState } from 'react';

export default function useMusicPlayer() {

    const audio = useRef(document.createElement('audio'));

    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState("");
    //setCurrentTime is for local use only, for setting time use updateTime
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [updatedTime, updateTime] = useState(0);

    const [storedTime, setStoredTime] = usePersistState(0, 'stored_time');

    const initialLoad = useRef(true);
    
    const [maxTime, setMaxTime] = useState(0);

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
            console.log('time update')
            // console.log(audio.current.currentTime)
            setCurrentTime(audio.current.currentTime)
        }
    }, [])

    useEffect(() => {
        console.log(currentTime)
        if(currentTime != 0 && currentTime != null) {
            console.log('setting')
            //localStorage.setItem('stored_time', currentTime.toString());
            setStoredTime(currentTime);
        }
        
    }, [currentTime])

    useEffect(() => {
        audio.current.src = src;

        const stored_time = parseFloat(localStorage.getItem('stored_time') as string)

        if(storedTime != 0) {
            console.log('updating')
            console.log(storedTime)
            updateTime(storedTime)
        } else {
            setStoredTime(0);
            //localStorage.setItem('stored_time', '0');
            updateTime(0);
        }
        
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