import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./About.css";
import { HttpGetWithAuth,HttpPostWithAuth } from "../../Utils/HttpGetWithAuth";
import CardModal from "../Cards/CardModal";
import CardMedia from '@mui/material/CardMedia';
import SubCardModal from "../Cards/SubTaskCardModal";
import ModulesModal from "../Cards/ModulesModal";
import LogModal from "../Cards/LogModal";


const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, img } = location.state || {};
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);  // Track which card is expanded
  const [subtaskList,setSubtaskList] = useState([]);
  const [openModuleForm,setOpenModuleForm] = useState(false);
  const [openlogModal,setOpenLogModal] = useState(false);


  const handleModuleClose = () =>{
    setOpenModuleForm(false);
  }

  const handleExpand = (index,item) => {
    // Toggle expand/collapse for the clicked card
    setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    expandedIndex == null ? fetchModules(item?.subTaskId) : setSubtaskList();
  };
  
  const handleReload = ()=>{
    setExpandedIndex(null);
  }
  

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  
  const handleLogModal = () =>{
    setOpenLogModal(true)
  }

  const handleCloseLogModal=()=>{
    setOpenLogModal(false);
    handleReload();
  }

  const handleNewModule= () =>{
    console.log("add a new module");
    setOpenModuleForm(true);
   
  }
   
  const fetchModules = async (id) =>{
    const result = await HttpPostWithAuth(
      `/getModules/${id}`,
      localStorage.getItem("username"),
      localStorage.getItem("password")
    );

    if(result){
      setSubtaskList(result);
    }
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

  const reload = () => {
    fetchSubTaskDetails();
  };

  return (
    <div className="st-home-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => { navigate("/home"); }}>
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
            />
          </div>
          <h2>Add New Sub-Task</h2>
          <button onClick={handleOpen} className="st-add-button">+ Add</button>
          <SubCardModal reload={reload} id={id} module={"subtask"} open={open} handleClose={handleClose} />
        </div>
      </div>

      <div className="st-cards-container">
        {data.map((item, index) => (
          <div
            key={index}
            className={`subtask-card ${expandedIndex === index ? 'expanded' : ''}`}
              // Handle card expand/collapse
          >
            <div onClick={() => handleExpand(index,item)} className="subtask-header">
              <div className="sub-subtask-header">
                <h3>{item.subTaskName}</h3>
                <h4>{item.subTaskDesc}</h4>
                <h4>Total Estimated Days : {item.totalEstimatedTime}</h4> 
              </div>
              {item.priority === "High" && <div className="priority-red">Priority: {item.priority}</div>}
              {item.priority === "Med" && <div className="priority-yellow">Priority: {item.priority}</div>}
              {item.priority === "Low" && <div className="priority-blue">Priority: {item.priority}</div>}
              <div  className="expand-icon">
                {expandedIndex === index ? '▲' : '▼'} {/* Arrow icon for expand/collapse */}
              </div>
            </div>

            {expandedIndex === index && (
              <div className="subtask-details">
                {/* Sub-Subtask Section below the Time Bar */}
                <div className="sub-subtask-section">
                  <h5>Subtasks Modules</h5>
                  {/* Example list of sub-subtasks */}
                  <ul>
                    {subtaskList?.map((subSubtask, subIndex) => (
                      
                      <li key={subIndex} className="sub-subtask-item">
                        <div className="subtask-name">
                          {subSubtask.moduleName}
                        </div>
                        <div className="time-bar-container">
                          <div className="efforts">
                          <label>Logged Effort: {subSubtask.TimeLogged || 0} hours</label>
                          <label>Total Effort Required: {subSubtask.totalEstimated || 0} hours</label>
                          </div>
                          <button onClick={handleLogModal} className="st-log-effort">+ Log</button>
                          <LogModal moduleId={subSubtask.Id} totalEffort = {subSubtask.totalEstimated} remainingHours={subSubtask.totalEstimated - subSubtask.TimeLogged} open={openlogModal} handleClose={handleCloseLogModal}/>
                          <input
                            type="range"
                            min="0"
                            max={subSubtask.totalEstimated}
                            value={subSubtask.TimeLogged || 0}
                            onChange={()=>{console.log("working")}}
                            className="time-bar"
                          />
                        </div>
                      </li>
                    ))}
                      <li onClick={()=>{handleNewModule()}} className="add-module">
                        <div className="subtask-name">
                          + Add a new module
                        </div>
                        </li>
                  </ul>
                  <ModulesModal reload={handleReload} open={openModuleForm} fkSubtaskId={item?.subTaskId} handleClose={handleModuleClose}/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
