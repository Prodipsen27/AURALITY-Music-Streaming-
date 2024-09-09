import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) { // Check if search term is not empty
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-white focus-within:text-gray-600">
      <label htmlFor="search-field" className="sr-only">What do you want to play?</label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-6 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="What do you want to play?"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
          className="flex-1 w-52 bg-transparent border-spacing-2 justify-center items-center outline-none placeholder-gray-500 text-base text-white p-4 mx-auto"

        />
      </div>
    </form>
  );
};

export default Searchbar;
