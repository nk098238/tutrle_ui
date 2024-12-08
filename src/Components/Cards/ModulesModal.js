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



const ModulesModal = (props) => {

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

    const [moduleName,setModuleName]  = useState("");
    const [loading,setLoading]  = useState(false);
    const [totalTime,setTotalTime]  = useState("");

    const handleModuleName = (event) =>{
        setModuleName(event.target.value);
    }
    const hanfleTotalTime = (event) =>{
        setTotalTime(event.target.value);
    }
    const handleCreateModules = async () =>{
    
        const result = await HttpPostWithAuth("/saveModule", localStorage.getItem("username"), localStorage.getItem("password"),{
            moduleName:moduleName,
            fkSubTaskId:props.fkSubtaskId,
            totalEstimated: parseInt(totalTime),
            totalEstimatedUnit:"days",
            TimeLogged:0,   
            createdBy:localStorage.getItem("username")
          });

        if(result){
            props.handleClose();
            props.reload();
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
     " Create a new module !!!" 
     
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      
      <TextField  value={moduleName} onChange={handleModuleName} sx={{ mb: 2 , }}  id="outlined-basic" label="Module name" variant="outlined" />
      <TextField  value={totalTime} onChange={hanfleTotalTime} fullWidth sx={{ mb: 2}}  id="outlined-basic" label="Total Efforts Required" variant="outlined" />
      <div className='submit-container'>
      <button onClick={()=>{handleCreateModules()}} className="add-button">Create</button>
      </div>
      </Typography>
    </Box>
  </Modal>}
   
  </div>
  )
}

export default ModulesModal