import React, { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';

function PracticeProblem({
  practiceProblems,
  loading,
  setPracticeProblems,
  setEntryObj,
  entryObj,
}) {
  // console.log("I am the setpracticeProblems props inside of PracticeProblem component: ", {setPracticeProblems})
  // console.log(`This is practiceProblems inside PracticeProblem component. Am I defined? Hm...: ${JSON.stringify(practiceProblems, null, 2)}`)
  // console.log(`This is the entryObj object inside PracticeProblem component. Am I updating? Hm...... :${JSON.stringify(entryObj, null, 2)}`)
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

  //?create handler to set isCompleted to true if checkbox is clicked
  const handleCheckmark = async (clickedBox) => {
    //clickedBox is being identified by its ID, which is the index
    //toggle problem.isCompleted to true (use ! i think no true since we want to able to uncheck)
    //use functional state handler to change state of problem array
    setPracticeProblems((prev) =>
      prev.map((problem, i) =>
        i === clickedBox
          ? { ...problem, isCompleted: !problem.isCompleted }
          : problem
      )
    );

    await setEntryObj((prev) => ({
      ...prev,
      practiceProblems: prev.practiceProblems.map((problemObj, index) =>
        index === clickedBox
          ? { ...problemObj, isCompleted: !problemObj.isCompleted }
          : problemObj
      ),
    }));
  };

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
            <div>
              <li key={index}>{problem.problem}</li>
              {/*//inside, map, assign a checkbox to each problem here*/}
              <input
                type='checkbox'
                id={`checkbox-${index}`}
                checked={problem.isCompleted}
                onChange={() => handleCheckmark(index)}
                className='hidden'
              />{' '}
              <label
                htmlFor={`checkbox-${index}`}
                className='cursor-pointer w-6 h-6 border-2 border-[#4A707A] rounded flex items-center justify-center transition-all duration-200 hover:bg-[#4A707A]/10'
              >
                {problem.isCompleted && (
                  <svg
                    className='w-4 h-4 text-[#4A707A]'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </label>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PracticeProblem;
