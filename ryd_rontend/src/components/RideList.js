// src/components/RideList.js
import React from 'react';
import Ride from './Ride';

const RideList = ({ rides }) => {
  return (
    <div>
      {rides.map(ride => (
        <Ride key={ride.id} ride={ride} />
      ))}
    </div>
  );
};

export default RideList;