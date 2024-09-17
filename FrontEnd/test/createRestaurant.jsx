import React from 'react';
import axios from 'axios';

const CreateRestaurant = () => {
  const createRestaurants = async () => {
    const restaurantData = [
      {
        id: 1,
        googlePlaceId: 'google-place-id-1',
        name: 'Restaurant 1',
        address: '123 Main St, City, Country',
        longitude: -122.4194,  
        latitude: 37.7749,   
        posts: []
      },
      {
        id: 2,
        googlePlaceId: 'google-place-id-2',
        name: 'Restaurant 2',
        address: '456 Elm St, City, Country',
        longitude: -74.0060, 
        latitude: 40.7128,   
        posts: []
      },
    ];

    try {
      for (const restaurant of restaurantData) {
        const response = await axios.post('https://localhost:5001/api/Restaurants', restaurant, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });

        console.log('Restaurant created:', response.data);
      }
    } catch (error) {
      console.error('Error creating restaurant:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button onClick={createRestaurants}>Create Restaurants</button>
    </div>
  );
};

export default CreateRestaurant;
