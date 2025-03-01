import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';

function Dashboard() {
  // TODO:  create a loading animation

  const location = useLocation();
  //extract userWQuery var sent to /dashboard from the landing page
  const { userQuery } = location.state;
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  console.log(
    'This is the query sent to us from da landing page:  ',
    userQuery
  );

  //create a function to request the approach
  const getStrategy = async () => {
    try {
      const result = await apiFetch.requestStrategy(userQuery);
      // const result = response.json();
      console.log('generated strategy:', result.responseStrategy);
      setStrategy(result.responseStrategy);
      setProbability(result.probability);
    } catch (error) {
      console.error('Error in getStrategy:', error);
    }
  };
  useEffect(() => {
    getStrategy();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <InputProblem inputProblem={userQuery} />
      <Strategy strategy={strategy} probability={probability} />
    </div>
  );
}

export default Dashboard;
