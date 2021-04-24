
const LibrarySong = ({song, songs, id, setCurrentSong, isPlaying, audioRef, setSongs, active}) => {
  
  const songSelectHandler = async () => {
    console.log(song);
    await setCurrentSong(song);
//active state 
  const newSong = songs.map(song => {
    if(song.id === id) {
      return {...song,
      "active": true}
    } else {
      return {...song,
      "active": false}
    }
  })
  setSongs(newSong)
  if(isPlaying) audioRef.current.play()
//cuando se cambia espera a que la cancion carge y la reproduce
    // if(isPlaying){
    //   const playPromise = audioRef.current.play();
    //   if(playPromise !== undefined){
    //     playPromise.then((audio) => {
    //       audioRef.current.play()
    //     })
    //   }
    // }
  }
  return(
    <div onClick={songSelectHandler}  className={`library-song ${active ? "selected" : ""}`}>
      <img alt={song.name} src={song.cover}/>
      <div className="song-description">
        <p>{song.name}</p>
        <p>{song.artist}</p>
      </div>
    </div>
  )
}

export default LibrarySong;