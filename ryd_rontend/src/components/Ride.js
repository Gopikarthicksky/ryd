// src/components/Ride.js
import React from 'react';

const Ride = ({ ride }) => {
  return (
    <div>
      <h2>{ride.title}</h2>
      <p>Driver: {ride.driver}</p>
      <p>Origin: {ride.origin}</p>
      <p>Destination: {ride.destination}</p>
    </div>
  );
};

export default Ride;