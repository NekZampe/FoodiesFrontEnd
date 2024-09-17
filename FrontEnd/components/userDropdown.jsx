import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUserLarge } from "react-icons/fa6";
import { useUserContext } from "../context/userContext";

const UserDropdown = () => {
  const navigate = useNavigate();
  const { logout } = useUserContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <div className="relative inline-block text-right">
      <div>
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={handleDropdownToggle}
        >
          <FaUserLarge className="h-8 w-8 text-red-800" />
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
