import {useRef,useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({setSongInfo, songInfo, currentSong, isPlaying, setIsPlaying, audioRef, songs, setSongs, setCurrentSong}) => {
//useRef
  // const [songInfo, setSongInfo] = useState({
  //   currentTime: 0,
  //   durationTime: 0
  // })
//useEffect
useEffect(() => {
  const newSong = songs.map(song => {
    if(song.id === currentSong.id) {
      return {...song,
      "active": true}
    } else {
      return {...song,
      "active": false}
    }
  })
  setSongs(newSong)
}, [currentSong])
//event handles
  const playSongHandler = () => {
    if(isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  const timeSongHandle = (e) => {
// with the event we can extract duration
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({...songInfo, currentTime: current, durationTime: duration})
  }

  const getTime = (time) => {
    return( Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2))
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    console.log(e)
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const skipSongHandler = async(direction) => {
    let currentIndexSong = songs.findIndex(song => song.id === currentSong.id)
    console.log(currentIndexSong)
    if(direction === 'skip-follow') {
      await setCurrentSong(songs[(currentIndexSong + 1) % songs.length])
    }
    if(direction === 'skip-back') {
      if((currentIndexSong -1) % songs.length === -1) {
        console.log(setCurrentSong(songs[songs.length - 1]))
        await setCurrentSong(songs[songs.length - 1])
        
        return;
      }
      await setCurrentSong(songs[(currentIndexSong - 1) % songs.length])
      console.log(setCurrentSong(songs[(currentIndexSong - 1) % songs.length]))
    }
    if(isPlaying) audioRef.current.play()
  }
    

  return(
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input min={0} max={songInfo.durationTime || 0} onChange={dragHandler} value={songInfo.currentTime} type="range"/>
        <p>{songInfo.durationTime ? getTime(songInfo.durationTime) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={() => skipSongHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => skipSongHandler('skip-follow')} className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      {/* <audio onLoadedMetadata={timeSongHandle} onTimeUpdate={timeSongHandle} ref={audioRef} src={currentSong.audio}></audio> */}
    </div>
  )
}

export default Player;