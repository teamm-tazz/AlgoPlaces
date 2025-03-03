import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import History from './History';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';

function Dashboard() {
  const location = useLocation();
  const { userQuery } = location.state;
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [entryObj, setEntryObj] = useState({
    //set history obj with query info to the response obj the server is sending back
    prompt: '',
    responseStrategy: '',
    probability: 0,
    practiceProblems: []

  });
  const [completeObj, setCompleteObj] = useState({
    prompt: '',
    responseStrategy: '',
    probability: 0,
    practiceProblems: []
  });

  console.log('This is the query sent to us from da landing page: ', userQuery);

  const getStrategy = async () => {
    setLoading(true);
    try {
      const result = await apiFetch.requestStrategy(userQuery);
      console.log('result', result);
      console.log('generated strategy:', result.responseStrategy);
      //setHistory(result);
      setStrategy(result.responseStrategy);
      setProbability(result.probability);
      //use a functional state update to update the history object
      setEntryObj((prev) => ({
        ...prev,
        prompt: result.prompt,
        responseStrategy: result.responseStrategy,
        probability: result.probability
      }))
      // console.log("Here's the history object from the first API call: ", history)
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
      setEntryObj((prev) => ({
        ...prev,
        practiceProblems: result
      }))

      // console.log("Here's the history object from the SECOND API call, should include practice probs: ", history)
    } catch (err) {
      console.error(`This is the error in getPracticeProblems: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const storeHistory = async () => {
    try{
      console.log('entryObj to store in DB', Array.isArray(entryObj));
      const response = await apiFetch.storeHistoryObj(entryObj);
    }
    catch (err){
      console.error(`This is the error in storingHistory: ${err}`);
    }
  }

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

  //check updatedHistory
  useEffect(() => {
    console.log('history updated: ', entryObj)
    storeHistory(entryObj);
  }, [entryObj]);



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
            setPracticeProblems={setPracticeProblems}
            loading={loading}
            setEntryObj={setEntryObj}
            entryObj={entryObj}
          />
        </div>
        <div className='col-span-1'>
          <History
            entryObj={entryObj}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;