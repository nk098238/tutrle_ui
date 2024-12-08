import React from 'react'
import { Navigate } from 'react-router-dom';


  
const ProtectedRoute = (props) => {

    const isAuthenticated = () =>{
        if(!localStorage.getItem("username") === null && !localStorage.getItem("password") === null){
            return true;
        }
        return true;
    }
    if (!isAuthenticated()) {
      // If not authenticated, redirect to the login page
      console.log("not auth")
      return <Navigate to="/" />;
    }
    
    // If authenticated, render the child components (e.g., /home page)
  
    return props.element;
  };


export default ProtectedRoute