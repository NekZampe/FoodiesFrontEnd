import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import axios from 'axios';
import GeolocationHelper from '../helpers/GeolocationHelper'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const MapUpdater = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const RestaurantMap = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/Restaurants', {
          headers: { 'Content-Type': 'application/json' },
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleLocationAvailable = ({ latitude, longitude }) => {
    setUserLocation([latitude, longitude]);
  };

  const center = userLocation || (restaurants.length > 0
    ? [restaurants[0].latitude, restaurants[0].longitude]
    : [51.505, -0.09]);

  const handleReturnClick = () => {
    navigate('/mainpage'); // Navigate to the main page
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <GeolocationHelper onLocationAvailable={handleLocationAvailable} />
      <button 
        onClick={handleReturnClick} 
        style={{
          position: 'absolute', 
          bottom: '10px', 
          left: '10px', 
          padding: '10px 20px', 
          backgroundColor: 'grey', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer', 
          zIndex: 1000 // Ensure the button is on top of the map
        }}
      >
        Return
      </button>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapUpdater center={center} />
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
          >
            <Popup>
              <b>{restaurant.name}</b><br/>{restaurant.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;
