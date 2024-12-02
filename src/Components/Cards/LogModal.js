import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import './CardModal.css';
import CircularProgress from '@mui/material/CircularProgress';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';



const LogModal = (props) => {
    console.log(props)
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

    const [loggedHour,setLoggedHour]  = useState("");
    const [loading,setLoading]  = useState(false);

    const handleLoggedEffort = (event) =>{
        setLoggedHour(event.target.value);
    }

    const handleLogFunction = async () =>{
      
      const result = await HttpPostWithAuth("/logEffort", localStorage.getItem("username"), localStorage.getItem("password"),{
        timeLogged:loggedHour,
        moduleId:props.moduleId
      });

    if(result && result === "SUCCESS"){
      props.handleClose();
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
     "Log Effort !!!" 
     
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      
      <TextField  value={loggedHour} onChange={handleLoggedEffort} sx={{ mb: 2 , }}  id="outlined-basic" label="Total hours" variant="outlined" />
      <Typography id="modal-modal-description" sx={{ mt: 0 }}>
        Total Hours : {props.totalEffort}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 0 }}>
       Hours Remaining To Log : {props.remainingHours}
      </Typography>
      <div className='submit-container'>
      <button  onClick={()=>{handleLogFunction()}} className="add-button">Log</button>
      </div>
      </Typography>
      
    </Box>
  </Modal>}
   
  </div>
  )
}

export default LogModal;