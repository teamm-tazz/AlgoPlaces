import React from 'react';
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import PracticeProblem from './PracticeProblem'
import Approach from './Approach'
import InputProblem from './InputProblem'
import apiFetch from '../apiFetch'

function Dashboard() {

  const location = useLocation();
  //extract userWQuery var sent to /dashboard from the landing page
  const {userQuery} = location.state;
  const [strategy, setStrategy] = useState('')
  console.log('This is the query sent to us from da landing page:  ', userQuery)

  //create a function to request the approach
  const getStrategy = async() => {
    const result = await apiFetch.requestStrategy(userQuery);
    setStrategy(result)

  }
  useEffect(() => {
    getStrategy()
  })

  return (
    <div>

      <h1>Dashboard</h1>
      <h2>Your Query: {userQuery} </h2>


    </div>
  );
}

export default Dashboard;