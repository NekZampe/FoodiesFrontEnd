import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RestaurantSearchBar = () => {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!query) {
        setRestaurants([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const response = await axios.get('https://localhost:5001/api/Restaurants/search', {
          params: { query }
        });
        setRestaurants(response.data);
        setShowDropdown(true);
      } catch (err) {
        setError('An error occurred while searching for restaurants.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchRestaurants, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleSelect = (restaurant) => {
    setQuery(restaurant.name);
    setShowDropdown(false);
    
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full z-50"
        placeholder="Search for restaurants..."
      />
      {loading && <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg p-2">Loading...</div>}
      {error && <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg p-2 text-red-500">{error}</div>}
      {showDropdown && restaurants.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              onClick={() => handleSelect(restaurant)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{restaurant.name}</h2>
              <p className="text-sm">{restaurant.address}</p>
            </li>
          ))}
        </ul>
      )}
      {restaurants.length === 0 && query && !loading && !error && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg p-2 z-50">No results found</div>
      )}
    </div>
  );
};

export default RestaurantSearchBar;
