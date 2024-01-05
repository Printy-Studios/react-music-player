import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import PlayButton from './PlayButton'
import useMusicPlayer from './useMusicPlayer'
import IconButton from './IconButton';
import TimeDisplay from './TimeDisplay';
import { percentOf, secondsToMinutesAndSeconds, numberToPercent } from './util';
import SongsMetadata from './SongMetadata';
import { usePersistState } from '@printy/react-persist-state'



export default function MusicPlayer() {

    const musicPlayer = useMusicPlayer();

    const [sliderValue, setSliderValue] = useState(0);
    const [isSliderActive, setIsSliderActive] = useState(false);

    const [currentTime, setCurrentTime] = useState({minutes: 0, seconds: 0});
    const [maxTime, setMaxTime] = useState({minutes: 0, seconds: 0});

    const [currentSong, setCurrentSong] = usePersistState<number>(0, 'current_song_index');
    const [songsMetadata, setSongsMetadata] = useState<SongsMetadata[]>([]);

    const onPlayButtonClick = () => {
        musicPlayer.setIsPlaying(!musicPlayer.isPlaying)
    }

    const onPrevButtonClick = () => {
        if(currentSong == 0) {
            setCurrentSong(songsMetadata.length - 1);
        } else {
            setCurrentSong(currentSong - 1);
        }
    }

    const onNextButtonClick = () => {
        if(currentSong == songsMetadata.length - 1) {
            setCurrentSong(0);
        } else {
            setCurrentSong(currentSong + 1);
        }
    }

    const fetchSongsMetadata = () => {
        fetch('songs_metadata.json')
        .then(res => res.json())
        .then(setSongsMetadata);
    }

    const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(e.currentTarget.value));
        setIsSliderActive(true);
    }

    const onSliderMouseUp = () => {
        const new_time = percentOf(musicPlayer.maxTime, sliderValue);
        musicPlayer.updateTime(new_time)
        setIsSliderActive(false);
    }

    const loadSong = (index: number) => {
        if(songsMetadata.length) {
            musicPlayer.setSrc(`songs/${songsMetadata[index].id}.wav`)
        }
    }

    useEffect(() => {
        fetchSongsMetadata()
    }, [])

    useEffect(() => {
        // setCurrentSong(0);
        loadSong(currentSong);
    }, [songsMetadata])

    useEffect(() => {
        loadSong(currentSong);
    }, [currentSong])

    useEffect(() => {
        if(!isSliderActive) {
            if(!musicPlayer.currentTime || !musicPlayer.maxTime) {
                setSliderValue(0)
            } else {
                setSliderValue(numberToPercent(musicPlayer.currentTime, musicPlayer.maxTime));
            }
            
        }
        setCurrentTime(secondsToMinutesAndSeconds(musicPlayer.currentTime));
    }, [musicPlayer.currentTime, musicPlayer.maxTime])

    useEffect(() => {
        setMaxTime(secondsToMinutesAndSeconds(musicPlayer.maxTime));
    }, [musicPlayer.maxTime])

    return (
        songsMetadata.length > 0 ?  
        <div className='music-player'>
            <div className='music-player-info'>
                <img 
                    src={`cover_art/${songsMetadata[currentSong].id}.jpg`} 
                    width='100%'
                />
                <h5>{songsMetadata[currentSong].title}</h5>
                <h6>{songsMetadata[currentSong].author}</h6>
            </div>
            
            <div className='music-player-controls'>
                <IconButton
                    onClick={onPrevButtonClick}
                    src={'icons/prev.svg'}
                />
                <PlayButton onClick={onPlayButtonClick} playing={musicPlayer.isPlaying} />
                <TimeDisplay time={currentTime} />
                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue} 
                    className="slider" 
                    onMouseUp={onSliderMouseUp}
                    onChange={onSliderChange}
                />
                <TimeDisplay time={maxTime} />
                <IconButton
                    onClick={onNextButtonClick}
                    src={'icons/next.svg'}
                />
            </div>
        </div>
        : null
    )

}