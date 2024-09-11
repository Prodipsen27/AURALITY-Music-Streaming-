import { useParams } from 'react-router-dom'; // Hook to access URL parameters
import { useSelector, useDispatch } from 'react-redux'; // Hooks to access and manipulate Redux state
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components'; // Import required components

import { setActiveSong, playPause } from '../redux/features/playerSlice'; // Redux actions

// API hooks to fetch song and artist details
import { useGetSongDetailsQuery, useGetTrackDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';

const SongDetails = () => {
  const dispatch = useDispatch();

  // Access song ID from the URL
  const { songid } = useParams();

  // Access the current active song and play/pause status from Redux state
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // Fetch song details based on song ID
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
  const { data: trackData, isFetching: isFetchingTrackDetails, error: trackError } = useGetTrackDetailsQuery({ songid });
  const { data: relatedSongData, isFetching: isFetchingRelatedSong, error: relatedError } = useGetSongRelatedQuery({ songid });

  // console.log('Song detail: ', relatedSongData?.tracks);
  // Function to handle when the pause button is clicked
  const handlePauseClick = () => {
    dispatch(playPause(false)); // Dispatches action to pause the song
  };

  // Function to handle when the play button is clicked
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data: relatedSongData?.tracks })); // Set active song
    dispatch(playPause(true)); // Dispatches action to play the song
  };

  // If the data is still being fetched, show the loader
  if (isFetchingSongDetails || isFetchingTrackDetails || isFetchingRelatedSong) {
    return <Loader title="Searching Song Details..." />;
  }

  // Handle errors if any occur during data fetching
  if (trackError || relatedError) {
    return <Error message="Error fetching song or related data" />;
  }

  return (
    <div className="flex flex-col">
      {/* DetailsHeader component to display song and artist details */}
      {trackData?.tracks?.map((track, i) => (
        <DetailsHeader
          // key={track.id}
          artistId=""
          songData={songData}
          track={track}
          i={i}
          // data={trackData?.tracks}
        />
      ))}

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">
          Lyrics:
          <div className="mt-10 h-60 sm:h-80 w-screen sm:max-w-screen-md overflow-y-auto pr-2">
            {/* Check if lyrics exist, then map over the lines and display them, otherwise show "No Lyrics" */}
            {songData?.lyrics?.lines ? (
              songData.lyrics.lines.map((line, index) => (
                <p key={index} className="text-gray-400 text-lg sm:text-2xl text-center my-1 truncate">
                  {line.words}
                </p>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No Lyrics</p>
            )}
          </div>
        </h2>
      </div>
      {/* {relatedSongData?.tracks?.map((track, i) => ( */}
      <RelatedSongs
        data={relatedSongData}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        // i={i}
      />
      {/* // ))} */}

    </div>
  );
};

export default SongDetails;
