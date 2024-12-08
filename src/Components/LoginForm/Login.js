import React, { useEffect, useState } from 'react';
import './Login.css';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';
import { Authentication } from '../Constants';
import { useNavigate,useLocation } from 'react-router-dom';

const Login = () =>{

  const [disableLogin,setDisableLogin] = useState(true);
  const [usernameText,setUsernameText] = useState("");
  const[password,setPassword] = useState("");
  const[InvalidCred,setInvalidCred] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [userAddFlag, setUserAddFlag] = useState(false);
  const [globalMsg,setGlobalMsg] = useState("");

  const { msg } = location.state || {};

  useEffect(()=>{
    if(msg == "alraedy have account"){
      setGlobalMsg("")
    }else if(msg == "user added succesfully"){
    setGlobalMsg("User created successfully! Please log in to access your account.")
    }
  },[msg])

  useEffect(()=>{
    checkdisabledLogin();
  },[usernameText,password])

  const handleusername = (event)=>{
        if(event.target.value){
          setUsernameText(event.target.value);
        }
  
  }

  const handleSingUp = (event) =>{
      navigate("/singup")
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
          if(result === Authentication.success){
            localStorage.setItem("username",usernameText)
            localStorage.setItem("password",password)
               navigate('/home')
               setGlobalMsg("");
              
              
          }
      } catch (error) {
        setGlobalMsg("Login failed! Incorrect username or password.")
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
        {/* <div className='remember-forgot'>
             <label><input type='checkbox'/>Remember me</label>
             <a href='#'></a>
        </div> */}
        <button type='submit' disabled={disableLogin} onClick={handleSubmit}>Login</button>
        <button type='submit'  onClick={handleSingUp}>Sign up</button>
      </form>
      <div><label className='label'>{globalMsg}</label> </div>
    </div>
    </div>
  )
}

export default Login;