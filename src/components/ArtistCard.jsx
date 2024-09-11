import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate(); // Hook to navigate between pages

  // Get the album image from the track object
  const artwork = track?.album?.images?.[0]?.url; 
  console.log("Artist Artwork:", artwork);

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.artists?.[0]?.id}`)} // Navigate to the artist's page when clicked
    >
      {/* Fallback to a placeholder image if artwork is undefined */}
      <img
        src={artwork || 'https://via.placeholder.com/250x250?text=No+Image'}
        className="w-full h-56 rounded-lg object-cover"
        alt="artist"
      />
      <p className="text-white mt-4 text-lg truncate">{track?.artists?.[0]?.name || 'Unknown Artist'}</p>
    </div>
  );
};

export default ArtistCard;
