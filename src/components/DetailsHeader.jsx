import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData, track, i }) => {
  return (
    <div className="relative w-full flex flex-row sm:items-center sm:space-x-4 pb-10 ">
      {/* Background Gradient */}
      <div className="absolute lg:-inset-y-10 w-full bg-gradient-to-l from-transparent to-black md:inset-0 sm:-inset-x-10  sm:inset-y-0 sm:h-48 h-28 rounded-l-full " />
      
      {/* Album/Artist Image */}
      <div className="relative sm:-inset-x-10 flex-shrink-0 ">
        <img 
          src={
            artistId 
              ? artistData?.images[0]?.url.replace("{w}", "500").replace("{h}", "500") 
              : track?.album?.images[1]?.url
          } 
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black " 
          alt="artwork" 
        />
      </div>

      {/* Song/Artist/Album Details */}
      <div className="relative xs:absolute flex flex-col space-y-2 text-left sm:ml-5 ml-6 ">
        <h1 className="text-white text-3xl font-bold mt-6 flex-shrink-0">
          {artistId ? artistData?.name : track?.name}
        </h1>

        {artistId ? (
          <Link to={`/artists/${artistId}`} className="text-gray-400 text-xl flex-shrink-0">
            {artistData?.name}
          </Link>
        ) : (
          <Link to={`/albums/${track?.album?.id}`} className="text-gray-400 text-xl flex-shrink-0">
            {track?.album?.name}
          </Link>
        )}

        {/* You can add more song details here, like release date or genre if needed */}
      </div>
    </div>
  );
};

export default DetailsHeader;
