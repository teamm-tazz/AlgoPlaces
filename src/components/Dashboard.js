import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';
import { MutatingDots } from 'react-loader-spinner';

function Dashboard() {
  // TODO:  create a loading animation

  const location = useLocation();
  //extract userWQuery var sent to /dashboard from the landing page
  const { userQuery } = location.state;
  const [queryInfo, setQueryInfo] = useState(Object);
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(
    'This is the query sent to us from da landing page:  ',
    userQuery
  );

  //create a function to request the approach
  const getStrategy = async () => {
    try {
      setLoading(true);
      const result = await apiFetch.requestStrategy(userQuery);
      // const result = response.json();
      console.log('result', result);
      console.log('generated strategy:', result.responseStrategy);
      setHistory(result);
      setStrategy(result.responseStrategy);
      setProbability(result.probability);
    } catch (error) {
      console.error('Error in getStrategy:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPracticeProblems = async () => {
    try {
      setLoading(true);
      const result = await apiFetch.requestPracticeProblems(userQuery);
      console.log('generated practice problems: ', result);
      setPracticeProblems(result);
    } catch (err) {
      console.error(`This is the error in getPracticeProblems: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStrategy();
  }, [userQuery]);

  useEffect(() => {
    getPracticeProblems();
  }, [strategy]);

  useEffect(() => {
    console.log('practiceProblems state:', practiceProblems);
  }, [practiceProblems]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>AlgoPlaces</h1>
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
        <div className='transition-opacity duration-500 opacity-100'>
          <InputProblem inputProblem={userQuery} />
          <Strategy strategy={strategy} probability={probability} />
          <PracticeProblem practiceProblems={practiceProblems} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
