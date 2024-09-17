import React from 'react';
import { MdFoodBank } from "react-icons/md";
import '../src/index.css';

const Footer = () => {
  return (
    <footer className="bg-red-600 bg-opacity-75 text-white h-[10vh] flex items-center justify-center p-5 mt-auto">
      <div className="flex items-center space-x-2">
        <MdFoodBank className="text-3xl" />
        <p className="text-xl font-semibold">Foodies &copy; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
