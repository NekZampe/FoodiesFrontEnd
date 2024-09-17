import { useState } from 'react';
import LoginPage from '../pages/loginPage';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Posts from '../components/Posts';
import TestPage from '../test/testPage';
import CreatePostForm from '../components/CreatePostForm';
import RestaurantPage from '../components/RestaurantPage';
import UserPage from '../pages/UserPage';
import RestaurantMap from '../components/RestaurantMap';

function App() {
  
  return (
    <Routes>
 <Route path="/" element={<LoginPage/>} />
 <Route path="/mainpage" element={<MainPage></MainPage>} />
 <Route path="/test" element={<TestPage></TestPage>} />
 <Route path='/newPost' element={<CreatePostForm/>}/>
 <Route path="/restaurant/:restaurantId" element={<RestaurantPage />} />
 <Route path='/myPage' element={<UserPage/>}/>
 <Route path='/map' element={<RestaurantMap></RestaurantMap>}></Route>

    </Routes>
    

  );
}

export default App;
