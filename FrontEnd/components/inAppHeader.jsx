import React from 'react';
import { Link } from 'react-router-dom'; 
import RestaurantSearchBar from './RestaurantSearchBar'; 
import UserDropdown from './UserDropdown'; 
import { CiMap } from 'react-icons/ci';

const InAppHeader = () => {
  return (
    <div className="flex justify-between items-center p-6 bg-gray-100 shadow-md"> 
      <div className="flex-1 max-w-xs z-50 mr-4"> 
        <RestaurantSearchBar />
      </div>
      <Link to="/map" className="text-gray-800 hover:text-gray-600 flex items-center">
        <CiMap size={24} className="mr-2" /> 
      </Link>
      <div className="flex-shrink-0 ml-4"> 
        <UserDropdown />
      </div>
    </div>
  );
};

export default InAppHeader;
