import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && activeSong?.id === song.id ? (
  <FaPauseCircle
    size={35}
    className="text-gray-300"
    onClick={handlePause}
  />
// console.log(song),
  // console.log(song.name)
) : (
  <FaPlayCircle
    size={35}
    className="text-gray-300"
    onClick={handlePlay}
  />
  // console.log("playPause",song),
  // console.log(song.name)
)
);

export default PlayPause;
