import React, { useState } from 'react';
import axios from 'axios';
import GeolocationHelper from '../helpers/GeolocationHelper';

const RestaurantSearch = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleSearch = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://localhost:5001/api/Restaurants/searchNearMe', {
        params: { latitude, longitude },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      const restaurants = response.data.map((place) => ({
        id: place.id,
        name: place.name,
        address: place.address,
        googlePlaceId: place.googlePlaceId,
      }));

      setRestaurants(restaurants);
    } catch (error) {
      console.error('Error searching restaurants:', error.response?.data || error.message);
    }
  };

  const handleLocationAvailable = ({ latitude, longitude }) => {
    setLocation({ latitude, longitude });
    console.log('Location updated:', { latitude, longitude });
  };

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onSelectRestaurant(restaurant);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 w-full text-center">
      <h1 className="text-2xl font-bold mb-4">Find Nearby Restaurants</h1>

      <GeolocationHelper onLocationAvailable={handleLocationAvailable} />

      <button
        onClick={() => {
          if (location?.latitude && location?.longitude) {
            handleSearch(location.latitude, location.longitude);
          } else {
            console.error('Location is not available.');
          }
        }}
        className="bg-red-800 text-white px-3 py-2 rounded-lg hover:bg-red-900 text-sm sm:text-base w-full"
      >
        Search
      </button>
    
      {restaurants.length > 0 && (
        <ul className="list-none mt-4">
          {restaurants.map((rest) => (
            <li
              key={rest.id}
              className={`mb-2 p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors duration-300 ${selectedRestaurant?.id === rest.id ? 'bg-red-100 border-red-300' : 'bg-white'}`}
              onClick={() => handleRestaurantSelect(rest)}
            >
              <div className="font-semibold">{rest.name}</div>
              <div>{rest.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantSearch;
