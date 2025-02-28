import React from 'react';
import {Approach} from'./Approach';
import {InputProblem} from './InputProblem'
import {PracticeProblem} from './PracticeProblem'

function Dashboard() {
  return (
    <InputProblem/>
    <Approach/>
    <PracticeProblem/>
  );
}

export default Dashboard;