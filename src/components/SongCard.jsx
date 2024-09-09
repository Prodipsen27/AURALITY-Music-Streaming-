import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause'; // PlayPause button component
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  // Function to handle when the pause button is clicked
  const handlePauseClick = () => {
    dispatch(playPause(false)); // Dispatches action to pause the song
  };

  // Function to handle when the play button is clicked
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, i, data })); // Set active song
    dispatch(playPause(true)); // Dispatches action to play the song
  };

  return (
    <div className="flex flex-col w-[200px] h-[270px]  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slidedown rounded-lg cursor-pointer">
      {/* Song artwork section */}
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.name === song.name ? 'flex bg-black bg-opacity-70' : 'hidden'
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img className="rounded-lg" src={song.album.images[0].url} alt="Song_img" />
      </div>

      {/* Song name and artist details */}
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`} className="text-white text-xl">
            {song.name}
          </Link>
        </p>

        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={`/artists/${song.artists[0].id}`}>
            {song.artists[0].name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
