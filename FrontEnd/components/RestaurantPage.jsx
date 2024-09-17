import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../components/Post';
import TaskBar from './TaskBar';

const RestaurantPage = () => {
  const { restaurantId } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/Restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (err) {
        setError('An error occurred while fetching restaurant data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!restaurant) return <div>No restaurant data found.</div>;

  return (
    <div >
      {/* Restaurant Info Card */}
      <div className="bg-red-900 shadow-md  p-6 mb-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-700">{restaurant.name[0]}</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{restaurant.name}</h1>
            <p className="text-lg text-white-600">{restaurant.address}</p>
          </div>
        </div>
      </div>

      {/* Render posts */}
      {restaurant.posts && restaurant.posts.length > 0 ? (
        restaurant.posts.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <div className="text-center text-gray-500">No posts available for this restaurant.</div>
      )}

      <TaskBar></TaskBar>
    </div>
  );
};

export default RestaurantPage;
