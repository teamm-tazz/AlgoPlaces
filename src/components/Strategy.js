import React from 'react';

function Strategy({ strategy, probability }) {
  return (
    <div>
      <p>{strategy}</p>
      <p>Interview Probability: {probability}</p>
    </div>
  );
}

export default Strategy;
