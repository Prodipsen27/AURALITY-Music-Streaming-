import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SongCard } from '../components';
import { useGetSearchQuery, useGetTrackDetailsQuery } from '../redux/services/apiCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetSearchQuery(searchTerm);

  let ids = [];

  if (data?.tracks?.items) {
    const tracks = data?.tracks?.items?.map((item) => item?.data?.id).join(',');
    // const ids = tracks.map((track) => track.data?.id); // Create comma-separated string of IDs
    // Store IDs in state
    ids = tracks;
  }
  // console.log(ids);

  const songid = ids;
  // console.log('ID', songid);

  const { data: songs } = useGetTrackDetailsQuery({ songid });
  // console.log('SONG', songs);
  const tracks = songs?.tracks;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Search results</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((song, i) => (
          // console.log('track', song),
          <SongCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={tracks}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
