import React from 'react';
import Dashboard from './Dashboard';
import {useNavigate} from 'react-router-dom'



//create a handleClick func that changes state
function LandingPage() {
//create useNavigate functionthat is a handle click that routes to the new page?
const navigate= useNavigate();

const useNavigateButton =() =>{
  navigate('/dashboard')
}


//  const getRoute = async() => {
//   try {

//     await fetch('/dashboard');

//     // if (!response.ok){
//     //   throw new Error("Error in getting dashboard route: " + response.status)
//     // }

//   } catch(err){
//     console.error("This is the error in getRoute: " + err)
//   }
//  }

  return (

    <div>
    <main><h2>Whatcha workin' on?</h2></main>
    <input type="text" placeholder=""></input>

    <button type="submit" onClick={useNavigateButton}>Submit Your Question</button>
    </div>

  );
}

export default LandingPage;