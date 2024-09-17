import React, { useState } from 'react';
import GeolocationHelper from '../helpers/GeolocationHelper';
import axios from 'axios';

const TestComponent = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState(null);

  const handleSearch = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://localhost:5001/api/Restaurants/searchNearMe', {
        params: { latitude, longitude },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      // Map response data to your desired format
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

  return (
    <div className="max-w-4xl mx-auto p-4">
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
        className="bg-blue-500 text-black px-3 py-2 rounded-lg hover:bg-blue-600 text-sm sm:text-base"
      >
        Search
      </button>
    
      {restaurants.length > 0 && (
        <ul className="list-disc pl-5 mt-4">
          {restaurants.map((rest) => (
            <li key={rest.id} className="mb-2 p-2 border border-gray-200 rounded-lg shadow-sm">
              <div className="font-semibold">{rest.name}</div>
              <div>{rest.address}</div>
              <button
                onClick={() => onSelectRestaurant(rest.id)}
                className="bg-green-500 text-black px-3 py-1 mt-2 rounded-lg hover:bg-green-600"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default TestComponent;
