// src/App.js
import React, { useState } from 'react';
import Home from './components/Home';
import RideList from './components/RideList';

const App = () => {
  const [rides, setRides] = useState([
    { id: 1, title: 'Ride 1', driver: 'Driver 1', origin: 'Location 1', destination: 'Location 2' },
    { id: 2, title: 'Ride 2', driver: 'Driver 2', origin: 'Location 3', destination: 'Location 4' },
    // Add more rides here...
  ]);

  return (
    <div>
      <Home />
      <RideList rides={rides} />
    </div>
  );
};

export default App;