import React from 'react';
import {useState} from 'react'
import Dashboard from './Dashboard';
import {useNavigate} from 'react-router-dom'


function LandingPage() {

//create useState that updates empty query
const [query, setQuery] = useState('') //query is originally an empty string
const navigate = useNavigate(); //create a useNav function

const handleSubmit = (event) => {
  event.preventDefault(); //prevents canceled submission

  console.log("Form is sumbmitted, here is the query: ", query)
  if (!query){
    return;
    //prevent empty submissions 
  }

  //handleClick will only navigate and pass state of query to Dashboard, apiFetch call will happen in Dashboard.js
  navigate('/dashboard', {state: {userQuery: query}}) //userQuery var will be sent to Dashboard.js, use useLocation to extract!
}

  return (

    <div>
    <main><h1>Whatcha workin' on?</h1></main>

    <form onSubmit={handleSubmit}>
    <input 
    type="text" 
    value={query} 
    onChange={(event) => setQuery(event.target.value)} 
    placeholder="Tell us your problem, we'll help ya!"
    
    />

    <button type="submit">Submit Your Question</button>
    </form>

    </div>
    
  );
}

export default LandingPage;