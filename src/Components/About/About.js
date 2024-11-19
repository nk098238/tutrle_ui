import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./About.css";
import { HttpGetWithAuth } from "../../Utils/HttpGetWithAuth";
import CardModal from "../Cards/CardModal";
import CardMedia from '@mui/material/CardMedia';
import SubCardModal from "../Cards/SubTaskCardModal";



const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id,img } = location.state || {};
  const [data, setData] = useState([]);
  const cardsArray = new Array(data.length).fill(data);
  const[open,setOpen] = useState(false);

  const handleClose = () =>{
    console.log("handleclose")
    setOpen(false);
  }

  const handleOpen = () =>{
    setOpen(true);
  }


  const fetchSubTaskDetails = async () => {
    const result = await HttpGetWithAuth(
      `/getSubtaskDetails/${id}`,
      localStorage.getItem("username"),
      localStorage.getItem("password")
    );
    

    if (result) {
      setData(result);
    }
  };

  useEffect(() => {
    fetchSubTaskDetails();
  }, []);

  const reload = ()=>{
    fetchSubTaskDetails();
  }

  return (
    <div className="st-home-container">
      <div className="back-button-container">
        <button className="back-button" onClick={()=>{navigate("/home")}} >
          &larr; Back
        </button>
      </div>

      <div className="st-top-section">
       
        <div className="st-add-card">
        <div className="st-pic">
        <CardMedia
          component="img"
          height="140"
          image={`/${img}.jpg`} 
          alt="green iguana"
        />  </div>
          <h2>Add New Sub-Task</h2>
          <button  onClick={handleOpen} className="st-add-button">+ Add</button>
          <SubCardModal reload = {reload} id={id} module={"subtask"} open={open} handleClose={handleClose}/>
        </div>
      </div>

      <div className="st-cards-container">
        {cardsArray.map((data, index) => (
          <div className="card" key={index}>
            <h3>{data[index].subTaskName}</h3>
            <p>{data[index].subTaskDesc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
