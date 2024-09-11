import { useEffect, useState } from 'react'; // Import necessary hooks
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTop100Query } from '../redux/services/apiCore';

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTop100Query();
  const [shuffledTracks, setShuffledTracks] = useState([]); // State to store shuffled tracks

  // Function to shuffle the tracks array without mutating the original array
  const shuffleArray = (array) =>
    array?.slice().sort(() => Math.random() - 0.5); // Make a shallow copy of the array and shuffle it

  // Shuffle tracks once when the component is mounted and data is available
  useEffect(() => {
    if (data?.tracks) {
      setShuffledTracks(shuffleArray(data.tracks));
    }
  }, [data]); // Dependency array ensures the shuffle only happens when data changes

  if (isFetching) return <Loader title="Loading top 100" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top 100</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {shuffledTracks?.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={shuffledTracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
