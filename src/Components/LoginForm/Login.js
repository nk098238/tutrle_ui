import React, { useEffect, useState } from 'react';
import './Login.css';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';
import { Authentication } from '../Constants';
import { useNavigate } from 'react-router-dom';

const Login = () =>{

  const [disableLogin,setDisableLogin] = useState(true);
  const [usernameText,setUsernameText] = useState("");
  const[password,setPassword] = useState("");
  const[InvalidCred,setInvalidCred] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    checkdisabledLogin();
  },[usernameText,password])

  const handleusername = (event)=>{
        if(event.target.value){
          setUsernameText(event.target.value);
        }
  
  }

  const handlePassword = (event) =>{
    if(event.target.value){
         setPassword(event.target.value);
    }
  }

  const checkdisabledLogin = () =>{
    if(usernameText !== "" && password !== ""){
      setDisableLogin(false);
    }
    else{
    setDisableLogin(true);
    }
  }

  const resetCred = () =>{
    setUsernameText("");
    setPassword("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchData = async () => {
      
     

      try {
          const result = await HttpPostWithAuth("/login", usernameText, password,{
            username:usernameText,
            password:password
          });
          if(result == Authentication.success){
               navigate('/home')
               setInvalidCred(false)
          }
      } catch (error) {
        setInvalidCred(true);
        resetCred();
      }
  };

  fetchData();
};
  return (
    <div className='wrapper'>
    <div className='poppins-semibold'
    >
      <form action=''>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' value={usernameText} onChange={handleusername} required/>
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' value={password} onChange={handlePassword} required></input>
        </div>
        <div className='remember-forgot'>
             <label><input type='checkbox'/>Remember me</label>
             <a href='#'></a>
        </div>
        <button type='submit' disabled={disableLogin} onClick={handleSubmit}>Login</button>
      </form>
      {InvalidCred && <div>
        <label className='label'>Login failed! Incorrect username or password.</label>
        </div>}
    </div>
    </div>
  )
}

export default Login;