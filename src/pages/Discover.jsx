import { useDispatch, useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';

import { genres } from '../assets/constants'; // Importing genres array from constants
import { useGetGenreQuery } from '../redux/services/shazamCore'; // Query hook for top charts
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Accessing the global state for the active song and playing status
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  // Fetching the top charts data from the API using the custom hook
  const { data, isFetching, error } = useGetGenreQuery(genreListId || 'POP');
  const tracks = data?.tracks; // Extract tracks from data if available
 
  // Handle loading and error statesflex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]
  if (isFetching) return <Loader title="Loading..." />;
  if (error) return <div className="w-full flex justify-between font-bold text-3xl text-white text-left items-center">Try Again!</div>;
  const genreTitle = genres?.find(({ value }) => value === genreListId)?.title || 'Pop';
  return (
    <div className="flex flex-col">
      {/* Header section for Discover page */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col my-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        {/* Dropdown for genre selection */}
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))} // Placeholder for genre change handling
          value={genreListId||'Pop'}
          className="bg-black text-white text-grey-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {/* Mapping through the genres array to display options */}
          {genres.map((genre) => (
            <option key={genre.value}>{genre.title}</option>
          ))}
        </select>
      </div>

      {/* Song cards section */}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* Mapping through the fetched tracks and rendering SongCard components */}
        {tracks?.map((track, i) => (
          <SongCard
            key={track.id} // Unique key for each track
            song={track} // Passing song data to SongCard
            isPlaying={isPlaying} // Passing the playing status
            activeSong={activeSong} // Passing the active song data
            data={tracks} // Passing the full tracks data
            i={i} // Index of the current song in the list
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
