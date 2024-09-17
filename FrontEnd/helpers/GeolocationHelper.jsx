import React, { useState, useEffect } from 'react';

const GeolocationHelper = ({ onLocationAvailable }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [hasLocation, setHasLocation] = useState(false); // Add state to track location retrieval

  useEffect(() => {
    if (hasLocation) return; 

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            if (onLocationAvailable) {
              onLocationAvailable({ latitude, longitude });
            }
            setHasLocation(true); // Set flag to true after obtaining location
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, [onLocationAvailable, hasLocation]); 

  return (
    <div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default GeolocationHelper;
