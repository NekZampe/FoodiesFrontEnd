import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdFoodBank } from 'react-icons/md'; // Import the food icon

const TaskBar2 = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-red-800 p-4 bottom-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold flex items-center">
          <MdFoodBank className="mr-2" /> {/* Add the icon with margin */}
          <p>Foodies</p>
        </div>
        <div className="flex space-x-4">
          <Link to="/newPost" className="text-white hover:text-black-300">
            New Post
          </Link>
          <Link to="/mainpage" className="text-white hover:text-gray-300">
            Feed
          </Link>
          <Link to="/myPage" className="text-white hover:text-gray-300">
            My Page
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TaskBar2;
