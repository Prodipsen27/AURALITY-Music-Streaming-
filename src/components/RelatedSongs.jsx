import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, artistId, handlePauseClick, handlePlayClick }) => {
  // Get tracks from the data
  const tracks = data;
  console.log("Songbar", tracks);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-white">
        Related Songs:
      </h1>

      <div className="mt-6 w-full flex flex-col">
        {/* Check if tracks exist, then map over them */}
        {data?.tracks?.map((song, i) => (
          <SongBar
            key={`${song.id}-${song?.artists[0]?.id}`} // Generate a unique key for each song
            song={song}
            i={i}
            artistId={artistId} // Ensure artistId is passed
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
