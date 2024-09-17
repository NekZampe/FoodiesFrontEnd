import React, { useState } from 'react';
import axios from 'axios';
import GeolocationHelper from '../helpers/GeolocationHelper';

const GoogleApiSearch = ({ onSelectRestaurantG }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // Function to search for nearby restaurants
  const googleApiSearch = async (latitude, longitude) => {
    try {
      const response = await axios.get('https://localhost:5001/api/GooglePlaces/nearMe', {
        params: { latitude, longitude },
        headers: { 'Content-Type': 'application/json' },
      });

      const transformedRestaurants = response.data.results.map((place) => ({
        id: 0, 
        googlePlaceId: place.place_id, 
        name: place.name,
        address: place.vicinity,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        posts: [] 
      }));

      setRestaurants(transformedRestaurants);
    } catch (error) {
      console.error('Error searching restaurants:', error.response?.data || error.message);
    }
  };

  // Function to handle restaurant selection and save it to the database
  const handleSelectRestaurant = async (restaurant) => {
    setSelectedRestaurant(restaurant);
    try {
      const response = await axios.post('https://localhost:5001/api/Restaurants', restaurant, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log('Restaurant created:', response.data);
      onSelectRestaurantG({
        id: response.data.id,
        name: response.data.name,
        address: response.data.address,
      });
    } catch (error) {
      console.error('Error creating restaurant:', error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:max-w-md">
      <h1 className="text-xl font-bold mb-4 text-center sm:text-2xl">Find Nearby With Google Places API</h1>
      
      <div className="mb-4">
        <button
          onClick={() => {
            if (location.latitude && location.longitude) {
              googleApiSearch(location.latitude, location.longitude);
            } else {
              console.error('Location is not available.');
            }
          }}
          className="bg-red-800 text-white px-3 py-2 rounded-lg hover:bg-red-900 text-sm sm:text-base w-full"
        >
          Search
        </button>
      </div>

      <GeolocationHelper
        onLocationAvailable={({ latitude, longitude }) => {
          setLocation({ latitude, longitude });
        }}
      />

      <ul className="list-none mt-4">
        {restaurants.map((restaurant) => (
          <li
            key={`${restaurant.googlePlaceId}-${restaurant.name}-${restaurant.latitude}-${restaurant.longitude}`}
            className={`mb-4 p-4 border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-colors duration-300 ${selectedRestaurant?.googlePlaceId === restaurant.googlePlaceId ? 'bg-red-100 border-red-300' : 'bg-white'}`}
            onClick={() => handleSelectRestaurant(restaurant)}
          >
            <div className="font-semibold">{restaurant.name}</div>
            <div>{restaurant.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleApiSearch;
