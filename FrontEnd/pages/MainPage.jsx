import React, { useState } from 'react';
import Posts from '../components/Posts';
import TaskBar from '../components/TaskBar';
import InAppHeader from '../components/inAppHeader';

const MainPage = () => {
  
  return (
    <div>
    <InAppHeader></InAppHeader>
        <Posts></Posts>
        <TaskBar></TaskBar>
    </div>
  );
};

export default MainPage;
