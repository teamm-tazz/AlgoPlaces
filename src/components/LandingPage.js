import React from 'react';
import Dashboard from './Dashboard';
import {useNavigate} from 'react-router-dom'
//create a useState that toggles the page?


//create a handleClick func that changes state
function LandingPage() {

const navigate = useNavigate();

const handleClick = () => {
  navigate('/dashboard')
}

//  const getRoute = async() => {
//   try {

//     const response = await fetch('/dashboard')

//     if (!response.ok){
//       throw new Error("Error in getting dashboard route: " + response.status)
//     }

//   } catch(err){
//     console.error("This is the error in getRoute: " + err)
//   }
//  }

  return (

    <div>
    <main><h2>Whatcha workin' on?</h2></main>
    <input type="text" placeholder=""></input>

    <button type="submit" onClick={handleClick}>Submit Your Question</button>
    </div>
    
  );
}

export default LandingPage;