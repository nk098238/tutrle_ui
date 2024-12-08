import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import './CardModal.css';
import { HttpPostWithAuth } from '../../Utils/HttpGetWithAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';



const CardModal = (props) => {
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

  const [name,setName] = useState("");
  //states
  const [desc,setDesc] = useState("");
  const [image,setImage] = useState("");
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event)=> {
      setName(event.target.value);
  }

  const handleDescChange=(event)=>{
    setDesc(event.target.value);
  }

  const handleImagePath = (event)=>{
    setImage(event.target.value);
  }

  const reset = () =>{
    setName("");
    setDesc("");
    setImage("");
  }


  const handleSubmit = (event) =>{
    setLoading(true);
    if(name!=="" && desc!==""){
      event.preventDefault();
      const saveData = async () => {
  
        try {
            const result = await HttpPostWithAuth("/saveTaskDetails", localStorage.getItem("username"), localStorage.getItem("password"),{
              taskName:name,
              taskDesc:desc,
              taskImgPath:image,
            });
           if(result == "SUCCESS"){
            props.handleClose();
            reset();
            navigate('/home');

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
      
      <TextField  value={name} onChange={handleNameChange} sx={{ mb: 2 , }}  id="outlined-basic" label="Task Title" variant="outlined" />
      <TextField  value={desc} onChange={handleDescChange} fullWidth sx={{ mb: 2}}  id="outlined-basic" label="Task Description" variant="outlined" />
      <TextField  value={image} onChange={handleImagePath} fullWidth sx={{ mb: 2}}  id="outlined-basic" label="Image Path" variant="outlined" />
      <div className='submit-container'>
      <button style={{ width: '190px' }} className="add-button">+ Add sub tasks</button>
      <button onClick={handleSubmit} className="add-button">Create</button>
      </div>
     
       
      </Typography>
    </Box>
  </Modal>}
   
  </div>
  )
}

export default CardModal;