import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PracticeProblem from './PracticeProblem';
import Strategy from './Strategy';
import History from './History';
import InputProblem from './InputProblem';
import apiFetch from '../apiFetch';
import { googleLogout } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import brainIcon from '../assets/brain.png';

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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
    <div className='relative'>
      <div className='w-full h-full bg-[#022839] pb-10 pt-6 pl-20 pr-20 flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <h1 className='text-5xl font-bold text-[#C2C8C5]'>AlgoPlaces</h1>
          <img
            src={brainIcon}
            alt='brain icon'
            className='h-12 w-12 object-contain filter brightness-90 invert opacity-80'
          />
        </div>
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className='p-2 rounded-full bg-[#4A707A] hover:bg-[#4A707A]/80 transition-all duration-200'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8 text-[#C2C8C5]'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </div>

      <div
        className={`px-20 min-h-screen transition-all duration-300 ease-in-out ${
          isHistoryOpen ? 'pr-[384px]' : ''
        }`}
      >
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
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-96 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isHistoryOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='h-full flex'>
          <div className='w-6'></div>
          <div className='flex-1 bg-gradient-to-b from-[#022839] to-[#3e3656]'>
            <History
              loading={loading}
              setEntryObj={setEntryObj}
              onClose={() => setIsHistoryOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
