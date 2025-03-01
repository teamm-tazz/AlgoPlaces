import React from 'react';
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import PracticeProblem from './PracticeProblem'
import Strategy from './Strategy'
import InputProblem from './InputProblem'
import apiFetch from '../apiFetch'




function Dashboard() {
  // TODO:  create a loading animation

  const location = useLocation();
  //extract userQuery var sent to /dashboard from the landing page
  const {userQuery} = location.state;
  const [strategy, setStrategy] = useState('')
  console.log('This is the query sent to us from da landing page:  ', userQuery)

  //create a function to request the approach
  const getStrategy = async() => {
    try {
    const result = await apiFetch.requestStrategy(userQuery);
    // const result = await response.json()
    console.log('generated strategy:', result.strategy)
    setStrategy(result.responseStrategy);

    } catch(err){
      console.error("This is the error in getStrategy ", err)
    }
  }

//   const getPracticeProblems = async()=> {
// try{
//   const result = await apiFetch.requestPracticeProblems()
// }
//   }
  useEffect(() => {
    getStrategy()
  }, [strategy])

  return (
    <div>

      <h1>Dashboard</h1>
      <h2>Your Query: {userQuery} </h2>
      <InputProblem inputProblem={userQuery}/>
      <Strategy strategy={strategy}/>




    </div>
  );
}

export default Dashboard;


//useState for practice problems
//two useEffects
  //one runs every time the query changes to fetch the approach, avoids an infninte loop bc strategy is being updated with the api call

  //the other one runs when the strategy is set, so it's forced to wait for the first useeffect
