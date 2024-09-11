import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetArtistDetailsQuery, useGetTopChartsQuery } from '../redux/services/apiCore';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artist, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);
  const { data, isFetching: isFetchingTrackDetails } = useGetTopChartsQuery();
  console.log('Artist Data:', data?.tracks);
  if (isFetchingArtistDetails) return;
    <Loader title="Searching artist details" />;
    const artistData = artist?.artists[0];
    console.log('Obj', Object.values(data));

    // console.log("data",artistData);
    // let songs= song

    return (
      <div className="flex flex-col">
        {/* <DetailsHeader artistId={artistId} artistData={artistData} />
      <RelatedSongs
      data={Object.values(artistData?.songs)}
      artistId={artistId}
      isPlaying={isPlaying}
      activeSong={activeSong}
      /> */}
      </div>
    );
};

export default ArtistDetails;
