import {useState} from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, isPlaying, audioRef, setSongs, libraryStatus}) => {
  return(
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song =>
          <LibrarySong 
            songs={songs}
            setCurrentSong={setCurrentSong} 
            song={song} 
            active={song.active}
            key={song.id}
            isPlaying={isPlaying}
            audioRef={audioRef}
            setSongs={setSongs}
            id={song.id}
          /> 
        )}
      </div>
    </div>
  )
}

export default Library;