import { usePersistState } from '@printy/react-persist-state';
import useTabState from '@printy/react-tab-state';
import { useEffect, useRef, useState } from 'react';

const worker = new SharedWorker("/worker.js");

console.log(worker)

export default function useMusicPlayer() {

    const audio = useRef(document.createElement('audio'));

    const [isPlaying, setIsPlaying] = useTabState(false, 'is_playing');
    const [src, setSrc] = useState<string>("");
    //setCurrentTime is for local use only, for setting time use updateTime
    const [currentTime, setCurrentTime] = useTabState<number>(0, 'current_time');
    const [updatedTime, updateTime] = useState(0);

    const [isMainTab, setIsMainTab] = useState<boolean>(false);

    const [storedTime, setStoredTime] = usePersistState(0, 'stored_time');
    
    const [maxTime, setMaxTime] = useState(0);

    useEffect(() => {
        console.log(updatedTime)
    }, [updatedTime])

    useEffect(() => {
        worker.port.start();

        setInterval(() => {
            worker.port.postMessage({
                type: "ping"
            });
        }, 1000)

        worker.port.onmessage = (e) => {
            const data = e.data;
            //console.log(data);
            switch(data.type) {
                case 'set_main_port': {
                    console.log('setting to main')
                    setIsMainTab(true);
                    break;
                }
                case 'unset_main_port': {
                    setIsMainTab(false);
                    break;
                }
            }
        }


    }, [])

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
        if(currentTime != 0 && currentTime != null) {
            //localStorage.setItem('stored_time', currentTime.toString());
            setStoredTime(currentTime);
        }
        
    }, [currentTime])

    useEffect(() => {
    
        if(!audio.current.src || audio.current.src == '' && storedTime != 0) {
            updateTime(storedTime)
        } else {
            setStoredTime(0);
            //localStorage.setItem('stored_time', '0');
            updateTime(0);
        }
        
        if(src == "") {
            //audio.current.removeAttribute('src');
        } else {
            audio.current.src = src;
        }

        if(isPlaying && isMainTab) {
            audio.current.play();
        }
    }, [src])

    useEffect(() => {
        audio.current.currentTime = updatedTime;
        setCurrentTime(updatedTime);
    }, [updatedTime])

    useEffect(() => {
        if (isPlaying && isMainTab) {
            // console.log('is main')
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