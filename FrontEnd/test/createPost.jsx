import React from 'react';
import axios from 'axios';

const CreatePost = () => {
  const createPosts = async () => {
    const postsData = [
      {
        content: 'This is the first test post.',
        imageUrls: [
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        ],
        publisher: 'Publisher 1',
        restaurant: {
          id: 1,
          googlePlaceId: 'google-place-id-1',
          name: 'Restaurant 1',
          address: '123 Main St, City, Country',
          posts: [] // Ensure this matches expected format
        }
      },
      {
        content: 'This is the second test post.',
        imageUrls: [
          'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=600'
        ],
        publisher: 'Publisher 2',
        restaurant: {
          id: 1,
          googlePlaceId: 'google-place-id-1',
          name: 'Restaurant 1',
          address: '123 Main St, City, Country',
          posts: [] // Ensure this matches expected format
        }
      },
      
    ];

    try {
      for (const postData of postsData) {
        const response = await axios.post('https://localhost:5001/api/Posts', {
          content: postData.content,
          publisher: postData.publisher,
          createdAt: new Date().toISOString(), // Use current date/time
          userId: 1, // Assuming userId 1 for this example
          imageUrls: postData.imageUrls,
          restaurantId: postData.restaurant.id,
          restaurant: {
            id: postData.restaurant.id,
            googlePlaceId: postData.restaurant.googlePlaceId,
            name: postData.restaurant.name,
            address: postData.restaurant.address,
            posts: postData.restaurant.posts // Ensure this matches expected format
          }
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        });

        console.log('Post created:', response.data);
      }
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button onClick={createPosts}>Create Posts</button>
    </div>
  );
};

export default CreatePost;
