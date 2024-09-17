import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useUserContext } from '../context/userContext'; // Adjust the path based on your file structure
import Post from '../components/Post'; // Adjust the import based on your file structure
import TaskBar from '../components/TaskBar';

const UserPage = () => {
  const { token } = useUserContext();
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          // First, get the user information from the token
          const userResponse = await axios.post(
            `https://localhost:5001/api/Auth/${token}`, // Adjust the endpoint if necessary
            {},
            {
              headers: {
                'Content-Type': 'application/json'
              },
              withCredentials: true
            }
          );

          const { sub: fetchedUserName } = userResponse.data.claims;
          setUserName(fetchedUserName);

          // Now fetch the posts using the userId
          const postsResponse = await axios.get('https://localhost:5001/api/Posts/by-userId', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true 
          });

          setPosts(postsResponse.data);

        } catch (err) {
          setError('Failed to fetch user data or posts.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [token]);

  // Generate random follower and following counts
  const followersCount = 12//Math.floor(Math.random() * 100) + 1;
  const followingCount = 13//Math.floor(Math.random() * 100) + 1;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-red-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg my-6 pt-3">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">{userName || 'User'}</h1>
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Followers</p>
            <p className="text-2xl font-bold text-red-600">{followersCount}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Following</p>
            <p className="text-2xl font-bold text-red-600">{followingCount}</p>
          </div>
        </div>
        {posts.length > 0 ? (
          posts.map(post => <Post key={post.id} post={post} />)
        ) : (
          <div className="text-center text-gray-500 mt-4">No posts available.</div>
        )}
      </div>
      <TaskBar />
    </div>
  );
};

export default UserPage;
