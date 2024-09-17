import React, { useEffect, useState } from 'react';
import Post from './Post'; 

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://localhost:5001/api/Posts'); 
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        console.log("Received data",data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Render the component
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-list">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
