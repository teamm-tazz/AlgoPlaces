import React, { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';

function PracticeProblem({ practiceProblems, loading }) {
  const [containerLoaded, setContainerLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  /// USE EFFECT For container fade-in on mount
  useEffect(() => {
    setContainerLoaded(true);
  }, []);

  /// USE EFFECT For content fade-in when loading completes and practiceProblems exists
  useEffect(() => {
    if (!loading && practiceProblems.length > 0) {
      setContentLoaded(false);
      const timer = setTimeout(() => setContentLoaded(true), 300);
      return () => clearTimeout(timer);
    }
    setContentLoaded(false);
  }, [loading, practiceProblems]);

  return (
    <div
      className={`p-4 mb-4 rounded-lg shadow-lg bg-gradient-to-r from-[#94B0B7] to-[#C2C8C5] break-words transition-opacity duration-500 ${
        containerLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h2 className='text-xl font-bold mb-2'>Practice Problems</h2>
      {loading ? (
        <div className='flex justify-center items-center'>
          <MutatingDots
            height={110}
            width={110}
            color='#4A707A'
            secondaryColor='#C2C8C5'
            ariaLabel='mutating-dots-loading'
            radius={15}
            visible={true}
          />
        </div>
      ) : (
        <ul
          className={`transition-all duration-500 ease-in-out transform ${
            contentLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {practiceProblems.map((problem, index) => (
            <li key={index}>{problem.problem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PracticeProblem;
