import React from 'react';
import { MdFoodBank } from "react-icons/md";
import '../src/index.css';

const Header = () => {
  return (
    <header className="bg-red-600 bg-opacity-75 text-white h-[10vh] flex items-center justify-center p-5">
      <div className="flex items-center space-x-2">
        <MdFoodBank className="text-3xl" />
        <h1 className="text-3xl font-bold">Foodies</h1>
      </div>
    </header>
  );
};

export default Header;
