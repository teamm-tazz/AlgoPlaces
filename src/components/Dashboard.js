import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';

function Dashboard() {
  const location = useLocation();
  const { userQuery } = location.state;
  const [history, setHistory] = useState(Object);
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log('This is the query sent to us from da landing page: ', userQuery);

  const getStrategy = async () => {
    setLoading(true);
    try {
      const result = await apiFetch.requestStrategy(userQuery);
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
    setLoading(true);
    try {
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
    if (strategy) {
      getPracticeProblems();
    }
  }, [strategy]);

  useEffect(() => {
    console.log('practiceProblems state:', practiceProblems);
  }, [practiceProblems]);

  return (
    <div className='p-4 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>AlgoPlaces</h1>
      <div className='grid grid-cols-2 gap-4 transition-opacity duration-500 opacity-100'>
        <div className='col-span-1'>
          <InputProblem inputProblem={userQuery} />
          <Strategy
            strategy={strategy}
            probability={probability}
            loading={loading}
          />
        </div>
        <div className='col-span-1'>
          <PracticeProblem
            practiceProblems={practiceProblems}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
