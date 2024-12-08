import React, { useEffect, useState } from 'react';
import './Singup.css';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [disableSignUp, setDisableSignUp] = useState(true);
  const [usernameText, setUsernameText] = useState('');
  const [firstnameText, setFirstNameText] = useState('');
  const[lastnameText,setLastNameText] = useState('');
  const [phone,setPhone]  = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [InvalidCred, setInvalidCred] = useState(false);
  const navigate = useNavigate();
  const [msg,setMsg] = useState("");

  useEffect(() => {
    checkDisabledSignUp();
  }, [usernameText, password, confirmPassword]);

  const handleUsername = (event) => {
   
      setUsernameText(event.target.value);
    
  };

  const handlePassword = (event) => {
   
      setPassword(event.target.value);
    
  };

  const handleConfirmPassword = (event) => {
   
      setConfirmPassword(event.target.value);
    
  };

  const checkDisabledSignUp = () => {
    if (usernameText !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword) {
      setDisableSignUp(false);
    } else {
      setDisableSignUp(true);
    }
  };

  const isNumber = (value) =>{
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(value);
  }

  const resetCred = () => {
    setUsernameText("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleFirstName = (event) => {
    
    setFirstNameText(event.target.value);
    
  }
  const handleLastname = (event) => {
  
    setLastNameText(event.target.value);
    
  }
  const handlePhone = (event) => {
    if(isNumber(event.target.value) || event.target.value === ''){
        setPhone(event.target.value);
    }
    
    
  }
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        // Assuming your backend API has a registration endpoint
        const result = await HttpPostWithAuth("/register", "nikhil", "nk123", {
          username: usernameText,
          password: password,
          firstName: firstnameText,
          lastName: lastnameText,
          phone: phone
        });

        if (result === 'SUCCESS') {
          navigate("/" , { state: { msg: "user added succesfully" } })
        } else {
          setInvalidCred(true);
        }
      } catch (error) {
        setInvalidCred(true);
        resetCred("Sign Up failed! Please try again.");
      }
    };

    fetchData();
  };

  const handlePasswordBlur = () => {
      if(!validatePassword(password)){
        setMsg("Password should be the combination of atleast one uppercase , one special character and one digit")
      }else{
        setMsg("")
      }
  }

  const handleConfirmPasswordBlur = () =>{
    if(password == confirmPassword){
        setMsg("")
    }else{
        setMsg("Password should match")
    }
  }

  return (
    <div className='wrapper'>
      <div className='poppins-semibold'>
        <form action=''>
          <h1>Sign Up</h1>
          <div className='userInfo'>
          <div className='input-box'>
            <input
              type='text'
              placeholder='FirstName'
              value={firstnameText}
              onChange={handleFirstName}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='text'
              placeholder='LastName'
              value={lastnameText}
              onChange={handleLastname}
              required
            />
          </div>
          </div>
          <div className='input-box'>
            <input
              type='text'
              placeholder='PhoneNumber'
              maxLength='10'
              value={phone}
              onChange={handlePhone}
            //   onBlur={validationFunction("phone")}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='text'
              placeholder='Username'
              value={usernameText}
              onChange={handleUsername}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={handlePassword}
              onBlur={handlePasswordBlur}
              required
            />
          </div>
          <div className='input-box'>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={handleConfirmPassword}
              onBlur={handleConfirmPasswordBlur}
              required
            />
          </div>
          <button type='submit' disabled={disableSignUp} onClick={handleSubmit}>
            Sign Up
          </button>
          <button type='button' onClick={() => navigate("/",{ state: { msg: "alraedy have account" } })}>
            Already have an account? Login
          </button>
        </form>
        {<div><label className='label'>{msg}</label></div>}
      </div>
    </div>
  );
};

export default SignUp;
