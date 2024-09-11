
import { Error, Loader, ArtistCard } from '../components';
import { useGetTop100Query } from '../redux/services/apiCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTop100Query();
  const tracks = data?.tracks;

  // Function to shuffle the tracks array without mutating the original array
  //   const shuffleArray = (array) =>
  //     // Make a shallow copy of the array using slice before shuffling
  //     array?.slice().sort(() => Math.random() - 0.5)
  //   // eslint-disable-next-line semi-style
  //   ;

  // Shuffle the tracks before rendering
  //   const shuffledTracks = shuffleArray(tracks);

  if (isFetching) return <Loader title="Loading top 100" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {tracks?.map((track) => (
          // .log(track),
          <ArtistCard
            key={track.id}
            track={track}
            data={tracks}

          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
