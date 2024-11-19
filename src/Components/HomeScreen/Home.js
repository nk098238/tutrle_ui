import React, { useEffect, useState } from 'react';
import './Home.css';
import MultiActionAreaCard from '../Cards/MultiActionAreaCard';
import { HttpGetWithAuth } from '../../Utils/HttpGetWithAuth';
import CardModal from '../Cards/CardModal';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  

  const navigate = useNavigate();

  const [data,setData] = useState([]);
  const [open,setOpen]  = useState(false);
  

  useEffect(()=>{
    
      fetchTasksRecord();
    
  },[open])


  const fetchTasksRecord = async () =>{
   
    const result = await HttpGetWithAuth("/getTaskDetails",  localStorage.getItem("username"), localStorage.getItem("password"));
    
    if(result){
      setData(result.tasks)
      console.log("tasks = "+result.tasks)
    }

  }

  const handleOpen = () =>{
    setOpen(true);
  }
  const handleClose = () =>{
    console.log("handleclose")
    setOpen(false);
  }
  const reload = () => {
    fetchTasksRecord();
  }

  const handleLogout = ()=>{
    localStorage.clear();
    navigate("/")
  }
    

   
  return (
    <>
     {/* Top Menu Bar */}
     <nav className="top-menu-bar">
        <div className="menu-logo">Task Organizer App</div>
        <ul className="menu-links">
          <li>Welcome {localStorage.getItem("username")} !!!</li>
          <li onClick={()=>{handleLogout()}} className='logout'>Logout</li>
        </ul>
      </nav>
    <div className="home-container">
    {/* Top Section for "Add New" */}
    <div className="top-section">
      <div className="add-card">
        <h2>Create a new task item</h2>
        <button onClick={handleOpen} className="add-button">+ Add</button>
       <CardModal module={"task"}open={open} handleClose={handleClose}/>
      </div>
    </div>

    {/* Lower Section for Saved List */}
    <div className="lower-section">
      <h3>Saved Lists</h3>
      <div className="card-grid">
        {/* Example saved list cards */}
        {
         
          Object.values(data).map((value,index)=>{
            console.log(value)
            return(
              <div  >{<MultiActionAreaCard name={value.taskName}  desc={value.taskDesc} img={value.taskImgPath} id={value.taskId} reload={reload} />}</div>
            ) 
          })
        }
      </div>
    </div>
  </div>
  </>
  )
}

export default Home