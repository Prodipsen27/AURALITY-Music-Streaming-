import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery, useGetArtistDetailsQuery } from '../redux/services/apiCore';
import 'swiper/css';
import 'swiper/css/free-mode';

// Component for displaying a single top chart card
const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (

  <div className="text-white w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3> {/* Rank number */}

    <div className="flex-1 flex justify-between items-center">
      {/* Song image */}
      <img className="w-20 h-20 rounded-lg" src={song.album.images[0].url} alt={song.name} />

      {/* Song and artist details */}
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-xl font-bold text-white">{song?.name}</p>
        </Link>
        <Link to={`/artists/${song.artists[0].id}`}>
          <p className="text-base text-gray-300 mt-1">{song.artists[0].name}</p>
        </Link>
      </div>
    </div>

    {/* Play/Pause button */}
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player); // Access active song and play state from Redux store
  const { data } = useGetTopChartsQuery(); // Fetch top chart data from API
  const { data: artistData } = useGetArtistDetailsQuery({ id }); // Fetch top artist data from API
  const divRef = useRef(null); // Create a reference for smooth scroll behavior
  /// ///////.log(artistData?.id);

  // Scroll to the top when component loads
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Extract the top 5 songs from the fetched data
  const topPlays = data?.tracks?.slice(0, 5);

  // Function to handle pausing a song
  const handlePauseClick = () => {
    dispatch(playPause(false)); // Dispatch playPause action to set isPlaying to false
  };

  // Function to handle playing a song
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i })); // Set the active song in Redux
    dispatch(playPause(true)); // Set the player state to playing
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] w-[400px] max-w-full flex flex-col">

      {/* Top Charts Section */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more...</p> {/* Link to full top charts */}
          </Link>
        </div>

        {/* List of Top 5 Songs */}
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.uri}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      {/* Top Artists Section */}
      <div className="w-full flex flex-col mt-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more...</p> {/* Link to full top artists */}
          </Link>
        </div>

        {/* Swiper for Top Artists */}
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song.id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={song.artists[0]?.id}>
                {/* <img className="rounded-full" src={artistData.images} alt="artist" /> Artist image */}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
