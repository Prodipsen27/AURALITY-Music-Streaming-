import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Control visibility of the player
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeSong && isActive) {
      setIsVisible(true); // Show the player when a new song is selected
      dispatch(playPause(true));
    }
  }, [activeSong, isActive, dispatch]);

  useEffect(() => {
    setAppTime(seekTime);
  }, [seekTime]);

  const handlePlayPause = () => {
    if (!activeSong) return;
    dispatch(playPause(!isPlaying));
  };

  const handleNextSong = () => {
    dispatch(playPause(false));
    const nextIndex = shuffle
      ? Math.floor(Math.random() * currentSongs.length)
      : (currentIndex + 1) % currentSongs.length;
    dispatch(nextSong(nextIndex));
  };

  const handlePrevSong = () => {
    const prevIndex = currentIndex === 0
      ? currentSongs.length - 1
      : (shuffle
        ? Math.floor(Math.random() * currentSongs.length)
        : currentIndex - 1);
    dispatch(prevSong(prevIndex));
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleSeekChange = (event) => {
    setSeekTime(event.target.value);
  };

  const handleSongEnd = () => {
    if (repeat) {
      setSeekTime(0);
    } else {
      handleNextSong();
    }
  };

  // Close the player and stop the music
  const handleClosePlayer = () => {
    setIsVisible(false); // Hide the player
    dispatch(playPause(false)); // Pause the music
  };

  return (
    isVisible && ( // Conditionally render the entire player UI only if visible
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 bg-opacity-60 bg-black backdrop-blur-md rounded-t-3xl">
        {/* Close Button */}
        <button
  onClick={handleClosePlayer}
  className="absolute top-2 right-2 text-white bg-transparent border border-none rounded-full p-2 hover:bg-red-600 hover:text-white transition-opacity"
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
</button>

<div className="relative flex flex-col sm:flex-row items-center justify-between w-full h-full space-y-4 sm:space-y-0 sm:space-x-4">
  <div className="flex flex-col sm:flex-row items-center sm:items-start sm:w-1/3 sm:mr-4">
    <div className="w-24 h-24 sm:w-16 sm:h-16">
      <img
        src={activeSong?.album.images[0].url}
        alt="Cover Art"
        className="w-25 h-25 justify-start rounded-full"
      />
    </div>
    <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col items-center sm:items-start text-center sm:text-left">
      <p className="font-semibold text-sm sm:text-base md:text-lg text-white">{activeSong?.name}</p>
      <p className="text-xs sm:text-sm md:text-base text-gray-300">{activeSong?.artists[0]?.name}</p>
    </div>
  </div>

  <div className="flex-1 flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
    <Controls
      isPlaying={isPlaying}
      repeat={repeat}
      setRepeat={setRepeat}
      shuffle={shuffle}
      setShuffle={setShuffle}
      currentSongs={currentSongs}
      handlePlayPause={handlePlayPause}
      handlePrevSong={handlePrevSong}
      handleNextSong={handleNextSong}
    />

    <Seekbar
      value={appTime}
      min="0"
      max={duration}
      onInput={handleSeekChange}
      onChange={handleSeekChange}
      setSeekTime={setSeekTime}
      appTime={appTime}
    />

    <Player
      activeSong={activeSong}
      volume={volume}
      isPlaying={isPlaying}
      seekTime={seekTime}
      repeat={repeat}
      onEnded={handleSongEnd}
      onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
      onLoadedData={(event) => setDuration(event.target.duration)}
    />
  </div>

  <div className="flex justify-center w-full sm:w-auto px-4">
    <VolumeBar
      value={volume}
      min="0"
      max="1"
      onChange={handleVolumeChange}
      setVolume={setVolume}
    />


          </div>
        </div>
      </div>
    )
  );
};

export default MusicPlayer;
