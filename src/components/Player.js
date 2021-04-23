import {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
//useRef
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    durationTime: 0
  })
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
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  return(
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input min={0} max={songInfo.duration} onChange={dragHandler} value={songInfo.currentTime} type="range"/>
        <p>{getTime(songInfo.durationTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
      </div>
      <audio onLoadedMetadata={timeSongHandle} onTimeUpdate={timeSongHandle} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  )
}

export default Player;