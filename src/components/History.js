import React, { useState, useEffect } from 'react';
import apiFetch from '../apiFetch';
import { MutatingDots } from 'react-loader-spinner';

function History({ loading, setEntryObj, onClose }) {
  const [historyObj, setHistoryObj] = useState([]);
  const [containerLoaded, setContainerLoaded] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  /// USE EFFECT For container fade-in on mount
  useEffect(() => {
    setContainerLoaded(true);
  }, []);

  useEffect(() => {
    if (!loading) {
      setContentLoaded(false);
      const timer = setTimeout(() => setContentLoaded(true), 300);
      return () => clearTimeout(timer);
    }
    setContentLoaded(false);
  }, [loading, historyObj]);

  const getHistoryObject = async () => {
    try {
      const response = await apiFetch.getHistory();
      console.log('data in getHistoryObject', response);
      setHistoryObj(response);
      console.log('historyObj', historyObj);
    } catch (err) {
      console.error(`This is the error in storingHistory: ${err}`);
    }
  };

  useEffect(() => {
    getHistoryObject();
  }, []);

  const handleMatchTitle = async (title) => {
    try {
      console.log('title in handleMatchTitle', title);
      const response = await apiFetch.matchTitle(title);
      console.log('Requested entry object from Database:', response);
      /// confirm with amrita that we are getting back an object in the format of entryOb
      setEntryObj(response);
    } catch (err) {
      console.error('This is the error in handleMatchTitle ', err);
    }
  };

  return (
    <div
      className={`h-full p-6 bg-gradient-to-b from-[#022839] to-[#3e3656] overflow-y-auto`}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-[#C2C8C5]'>History</h2>
        <button
          onClick={onClose}
          className='p-2 rounded-full hover:bg-white/10 transition-colors'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-[#C2C8C5]'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

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
        <div className='space-y-4'>
          {historyObj.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMatchTitle(item.title)}
              className='w-full text-left p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-[#C2C8C5]'
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default History;
