import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import History from './History';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';

function Dashboard() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { userQuery } = location.state;
  const [title, setTitle] = useState('');
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [entryObj, setEntryObj] = useState({
    //set history obj with query info to the response obj the server is sending back
    title: '',
    prompt: '',
    responseStrategy: '',
    probability: 0,
    practiceProblems: [],
  });
  const [historyObjIsComplete, setHistoryObjIsComplete] = useState(false);

  console.log('This is the query sent to us from da landing page: ', userQuery);

  const getStrategy = async () => {
    setLoading(true);

    try {
      const result = await apiFetch.requestStrategy(userQuery);
      console.log('result', result);
      console.log('generated strategy:', result.responseStrategy);
      //setHistory(result);
      setTitle(result.title);
      setStrategy(result.responseStrategy);
      setProbability(result.probability);
      //use a functional state update to update the history object
      setEntryObj((prev) => ({
        ...prev,
        title: result.title,
        prompt: result.prompt,
        responseStrategy: result.responseStrategy,
        probability: result.probability,
      }));
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
        practiceProblems: result,
      }));
      setHistoryObjIsComplete(true);
      // console.log("Here's the history object from the SECOND API call, should include practice probs: ", history)
    } catch (err) {
      console.error(`This is the error in getPracticeProblems: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const storeHistory = async () => {
    //function that runs once the entry object has all the parameters
    try {
      console.log('entryObj to store in DB', entryObj);
      const response = await apiFetch.storeHistoryObj(entryObj);
    } catch (err) {
      console.error(`This is the error in storingHistory: ${err}`);
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

  useEffect(() => {
    //stores history object in database when ready
    console.log('history updated: ', entryObj);
    if (historyObjIsComplete) {
      //condition to check before calling the fetch function
      setHistoryObjIsComplete(false);
      storeHistory(entryObj);
    }
    
    setTitle(entryObj.title)
    setStrategy(entryObj.responseStrategy)
    setProbability(entryObj.probability)
    setPracticeProblems(entryObj.practiceProblems)

    

  }, [entryObj]);

  return (
    <div>
      <h1 className='text-4xl font-bold p-8 bg-[#022839] text-[#C2C8C5]'>
        AlgoPlaces
      </h1>
      <div className='p-4 min-h-screen'>
        <div className='grid grid-cols-2 gap-4 transition-opacity duration-500 opacity-100'>
          <div className='col-span-1'>
            <InputProblem inputProblem={userQuery} title={title} />
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
            <History loading={loading} setEntryObj={setEntryObj}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
