import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';

import { useGetSongsByCountryQuery } from '../redux/services/apiCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  const tracks = data?.tracks;
  //   console.log(tracks);
  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_oaukdXkuLeD6bvomLcDFzDY8Sy3CQ')
      .then((res) => setCountry(res?.data?.location?.country))
    //   .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title=" Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
                tracks?.map((song, i) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={tracks}
                    i={i}
                  />
                ))
            }
      </div>

    </div>
  );
};

export default AroundYou;
