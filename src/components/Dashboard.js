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
  const [history, setHistory] = useState(Object);
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  console.log(
    'This is the query sent to us from da landing page:  ',
    userQuery
  );

  //create a function to request the approach
  const getStrategy = async () => {
    try {
      const result = await apiFetch.requestStrategy(userQuery);
      // const result = response.json();
      console.log('result', result);
      console.log('generated strategy:', result.responseStrategy);
      setHistory(result);
      setStrategy(result.responseStrategy);
      setProbability(result.probability);
    } catch (error) {
      console.error('Error in getStrategy:', error);
    }
  };

  const getPracticeProblems = async () => {
    try {
      const result = await apiFetch.requestPracticeProblems(userQuery);
      console.log('generated practice problems: ', result);
      setPracticeProblems(result);
    } catch (err) {
      console.error(`This is the error in getPracticeProblems: ${err}`);
    }
  };

  useEffect(() => {
    getStrategy();
  }, [userQuery]);

  useEffect(() => {
    getPracticeProblems();
  }, [strategy]);

  useEffect(() => {
    console.log('practiceProblems state:', practiceProblems)
  }, [practiceProblems]);

  return (
    <div>
      <h1>Dashboard</h1>
      <InputProblem inputProblem={userQuery} />
      <Strategy strategy={strategy} probability={probability} />
      <PracticeProblem practiceProblems={practiceProblems}/>
    </div>
  );
}

export default Dashboard;
