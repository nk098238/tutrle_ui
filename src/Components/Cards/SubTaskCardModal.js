import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import './CardModal.css';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'; // Import Material-UI components



const SubCardModal = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    gap:'16px'

  };

  const [subtaskname,setSubTaskName] = useState("");
  //states
  const [subTaskdesc,setSubTaskDesc] = useState("");
  const [Priority,setPriority] = useState("");
  const[totalTime,setTotalTime] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event)=> {
      setSubTaskName(event.target.value);
  }

  const handleDescChange=(event)=>{
    setSubTaskDesc(event.target.value);
  }

  const handlePriority = (event)=>{
    setPriority(event.target.value);
  }

  const handleTotalTime=(event)=>{
    setTotalTime(event.target.value)
  }

  const reset = () =>{
    setSubTaskName("");
    setSubTaskDesc("");
    setPriority("");
    setTotalTime("");
  }


  const handleSubmit = (event) =>{
    setLoading(true);
    if(subtaskname!=="" && subTaskdesc!==""){
      event.preventDefault();
      const saveData = async () => {
  
        try {
            const result = await HttpPostWithAuth("/saveSubTaskItem", localStorage.getItem("username"), localStorage.getItem("password"),{
              subTaskName:subtaskname,
              subTaskDesc:subTaskdesc,
              fkTaskId:props.id,
              priority:Priority,
              totalEstimatedTime:totalTime,
              createdBy:localStorage.getItem("username")
            });
           if(result == "SUCCESS"){
            props.handleClose();
            reset();
            props.reload();
          

           }
        } catch (error) {
           console.log("some issue occured while saving details")
        }finally{
          setLoading(false)
        }
    };
  
    saveData();
    }
  }
  
  return (
    <div className="modal">
    {loading ?  <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box> :  <Modal
    open={props.open}
    onClose={props.handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      {props.module == "subtask" ? " Create a new sub task item !!!" :  "Create a task item !!!"}
     
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      
      <TextField  value={subtaskname} onChange={handleNameChange} sx={{ mb: 2 , }}  id="outlined-basic" label="Sub Task Title" variant="outlined" />
      <TextField  value={subTaskdesc} onChange={handleDescChange} fullWidth sx={{ mb: 2}}  id="outlined-basic" label="Sub Task Description" variant="outlined" />
      <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel id="priority-label">Priority</InputLabel>
      <Select
        labelId="priority-label"
        id="priority-select"
        value={Priority}
        onChange={handlePriority}
        label="Priority"
        variant="outlined"
      >
        <MenuItem value="High">High</MenuItem>
        <MenuItem value="Med">Medium</MenuItem>
        <MenuItem value="Low">Low</MenuItem>
      </Select>
    </FormControl>
      <TextField  value={totalTime} onChange={handleTotalTime} fullWidth sx={{ mb: 2}}  id="outlined-basic" label="Total Estimated Time" variant="outlined" />
      <div className='submit-container'>
      <button onClick={handleSubmit} className="add-button">Create</button>
      </div>
     
       
      </Typography>
    </Box>
  </Modal>}
   
  </div>
  )
}

export default SubCardModal;