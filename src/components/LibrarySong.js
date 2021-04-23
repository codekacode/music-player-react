
const LibrarySong = ({song}) => {
  return(
    <div className="library-song">
      <img alt={song.name} src={song.cover}/>
      <div className="song-description">
        <p>{song.name}</p>
        <p>{song.artist}</p>
      </div>
    </div>
  )
}

export default LibrarySong;