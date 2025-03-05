import React, { useState, useEffect } from 'react';
import apiFetch from '../apiFetch';
import { MutatingDots } from 'react-loader-spinner';

function History ({loading}) {

  const [ historyObj, setHistory ] = useState([]);
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
        try{
          const response = await apiFetch.getHistory();
          console.log('data in getHistoryObject', response);
          setHistory(response);
          console.log('historyObj', historyObj);
        }
        catch (err){
          console.error(`This is the error in storingHistory: ${err}`);
        }
    }

  useEffect(() => {
    getHistoryObject();
  }, []);


  return (
    <>
      <div
        className={`p-4 mb-4 rounded-lg shadow-lg bg-gradient-to-r from-[#94B0B7] to-[#C2C8C5] break-words transition-opacity duration-500 ${
          containerLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      <h2 className='text-xl font-bold mb-2'>History</h2>

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
        <>
          <ul
            className={`transition-all duration-500 ease-in-out transform ${
              contentLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          ></ul>

          <div>
            {historyObj.map((item, index) => (
              <div key={index} >
                <ul class="cursor-pointer">{item.title}</ul>
              </div>
            ))}
          </div>
        </>
      )}
    </>
   );
  }
export default History;