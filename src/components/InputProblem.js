import React, { useState, useEffect } from 'react';

function InputProblem({ inputProblem }) {
  const [containerLoaded, setContainerLoaded] = useState(false);

  useEffect(() => {
    setContainerLoaded(true);
  }, []);

  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-lg bg-[#94B0B7] break-words transition-opacity duration-500 ${
        containerLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className='text-xl font-bold mb-2'>Your Prompt</h2>
      <p>{inputProblem}</p>
    </div>
  );
}

export default InputProblem;
