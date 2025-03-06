import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import History from './History';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';
import { googleLogout } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { userQuery } = location.state;
  const [title, setTitle] = useState('');
  const [strategy, setStrategy] = useState('');
  const [probability, setProbability] = useState('');
  const [practiceProblems, setPracticeProblems] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [entryObj, setEntryObj] = useState({
    //set history obj with query info to the response obj the server is sending back
    title: '',
    prompt: '',
    responseStrategy: '',
    probability: 0,
    practiceProblems: [],
  });
  const [historyObjIsComplete, setHistoryObjIsComplete] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  ///logging user object after auth
  console.log(
    'user object from authentication using getItem method:',
    localStorage.getItem('user')
  );

  console.log('This is the query sent to us from da landing page: ', userQuery);
  /// HANDLER FUNCTION TO LOGOUT
  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    Navigate('/');
  };
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
      setPrompt(result.prompt);
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
    /// make sure we only generate practiceProblems on initial Load/ redirect from landing page
    if (strategy && initialLoad) {
      getPracticeProblems();
      setInitialLoad(false);
    }
  }, [strategy]);

  useEffect(() => {
    console.log('practiceProblems state:', practiceProblems);
  }, [practiceProblems]);

  useEffect(() => {
    //stores history object in database when ready
    console.log('history updated: ', entryObj);
    if (historyObjIsComplete || entryObj.practiceProblems.length > 0) {
      //condition to check before calling the fetch function
      setHistoryObjIsComplete(false);
      storeHistory(entryObj);
    }

    if (!initialLoad) {
      setTitle(entryObj.title);
      setStrategy(entryObj.responseStrategy);
      setProbability(entryObj.probability);
      setPracticeProblems(entryObj.practiceProblems);
      setPrompt(entryObj.prompt);
    }
  }, [entryObj]);

  return (
    <div>
      <h1 className='text-5xl font-bold pl-20 pt-10 bg-[#022839] text-[#C2C8C5]'>
        AlgoPlaces
      </h1>
      <div className='pl-20 pr-20 pt-10 min-h-screen'>
        <div className='grid grid-cols-2 gap-10 transition-opacity duration-500 opacity-100'>
          <div className='col-span-1'>
            <InputProblem inputProblem={prompt} title={title} />
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
            <History loading={loading} setEntryObj={setEntryObj} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
