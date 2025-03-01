import React from 'react';

function PracticeProblem({practiceProblems}){
    console.log('practiceProblems in PracticeProblems', practiceProblems);
return (

<div>

<ul>

<h2>Practice Problems</h2>

{practiceProblems.map((problem, index) => (
<li key={index}>{problem.problem}</li>

))}


</ul>

</div>
)

}

export default PracticeProblem