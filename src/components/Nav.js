import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({libraryStatus, setLibraryStatus}) => {
  const openLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  }
  return (
    <nav>
      <h1>Waves</h1>
      <button 
        className={`library-status ${libraryStatus ? "library-active" : ""}`}
        onClick={openLibraryHandler}
      >
        Library
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
  )
};

export default Nav;