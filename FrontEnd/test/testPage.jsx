import React, { useState } from 'react';
import CreatePost from './createPost';
import CreateUser from './createUser';
import CreateRestaurant from './createRestaurant';
import CreatePostForm from '../components/CreatePostForm';
import GoogleApiSearch from '../components/GoogleApiSearch';
import RestaurantSearch from '../components/RestaurantSearch';
import TestComponent from '../components/testComponent';


const TestPage = () => {

  const handleRestaurantSelect = (restaurantId) => {
    console.log("Selected restaurant ID:", restaurantId);
  }
  const handleRestaurantSelectG = (restaurantIdG) => {
    console.log("Selected Google restaurant ID:", restaurantIdG);
  }


  return (
    <div>
        {/* <CreatePost></CreatePost> */}
        {/* <CreateUser></CreateUser>
       <CreateRestaurant></CreateRestaurant> */}
       <GoogleApiSearch onSelectRestaurantG={handleRestaurantSelectG}/>
       {/* <RestaurantSearch></RestaurantSearch>
       <CreatePostForm></CreatePostForm> */}
       <RestaurantSearch onSelectRestaurant={handleRestaurantSelect} />
     
    </div>
  );
};

export default TestPage;
