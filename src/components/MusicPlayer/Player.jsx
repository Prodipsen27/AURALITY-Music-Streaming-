import React, { useRef, useEffect } from 'react';

/**
 * Player Component
 * @param {Object} props
 * @param {Object} props.activeSong - The currently active song object.
 * @param {Boolean} props.isPlaying - Boolean value that indicates whether the song is playing.
 * @param {Number} props.volume - The volume level for the player.
 * @param {Number} props.seekTime - The time to which the audio should be seeked.
 * @param {Function} props.onEnded - Function to handle when the song ends.
 * @param {Function} props.onTimeUpdate - Function to handle updates in song's current time.
 * @param {Function} props.onLoadedData - Function to handle when the song's metadata is loaded.
 * @param {Boolean} props.repeat - Boolean value that indicates whether the song should repeat.
 */
const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      isPlaying ? ref.current.play() : ref.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <>
      <audio
        src={activeSong?.preview_url}
        ref={ref}
        loop={repeat}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onLoadedData={onLoadedData}
      />
    </>
  );
};

export default Player;
