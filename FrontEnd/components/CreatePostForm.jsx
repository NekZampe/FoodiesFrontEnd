import React, { useState } from 'react';
import axios from 'axios';
import GoogleApiSearch from './GoogleApiSearch';
import RestaurantSearch from './RestaurantSearch';
import PostImageUrlsDev from './PostImageUrlsDev';
import PostDescription from './PostDescription';
import { useUserContext } from '../context/userContext'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import TaskBar2 from './TaskBar copy';
import RestaurantMap from './RestaurantMap';

const CreatePostForm = () => {
  const navigate = useNavigate(); 
  const [imageUrls, setImageUrls] = useState(['', '', '']);
  const [description, setDescription] = useState('');
  const [selectedRestaurantData, setSelectedRestaurantData] = useState(null);
  const [showGoogleApiSearch, setShowGoogleApiSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const { token } = useUserContext();

  const handleImageChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const pages = [
    <PostImageUrlsDev images={imageUrls} onImageChange={handleImageChange} />,
    <PostDescription key="postDescription" description={description} onDescriptionChange={setDescription} maxLength={150} />,
  ];

  const searchPage = showGoogleApiSearch ? (
    <div>
      <GoogleApiSearch onSelectRestaurantG={setSelectedRestaurantData} />
      <button
        onClick={() => setShowGoogleApiSearch(false)}
        className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4 w-full"
      >
        Back to Restaurant Search
      </button>
      
    </div>
  ) : (
    <div>
      <RestaurantSearch onSelectRestaurant={setSelectedRestaurantData} />
      <button
        onClick={() => setShowGoogleApiSearch(true)}
        className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4 w-full"
      >
        Not finding what you're looking for? Try here
      </button>
    </div>
  );

  pages.splice(1, 0, searchPage); 

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const submitPost = async () => {
    
    if (!description || !selectedRestaurantData.id || imageUrls.length === 0) {
      console.error('Please fill in all fields.');
      return;
    }

    const postData = {
      content: description,
      imageUrls: imageUrls.filter(url => url.trim() !== ''), 
      restaurantId: selectedRestaurantData.id,
      restaurantName: selectedRestaurantData.name, // Issue here
      restaurantAddress: selectedRestaurantData.address // Issue here
    };

    console.log('Submitting post data:', postData);
    console.log('Token:', token);

    try {
      const response = await axios.post(
        'https://localhost:5001/api/Posts',
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          withCredentials: true 
        }
      );
      console.log('Post created:', response.data);
      alert("Post Succesfully Created, Returning to MainPage")
      navigate('/mainpage');
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {pages[currentPage]}
      </div>
      <div className="p-4 bg-gray-200 flex justify-between">
        {currentPage > 0 && (
          <button
            onClick={handlePrevious}
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900"
          >
            Previous
          </button>
        )}
        {currentPage < pages.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitPost}
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900"
          >
            Submit Post
          </button>
        )}
      </div>
      <div>
      <TaskBar2></TaskBar2>
      </div>
    </div>
  );
};

export default CreatePostForm;
