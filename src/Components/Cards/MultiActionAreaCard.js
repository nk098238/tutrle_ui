import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { HttpGetWithAuth } from '../../Utils/HttpGetWithAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import About from '../About/About';

export default function MultiActionAreaCard(props) {

  const navigate = useNavigate();

   const handleDelete = (id) =>{

     const deleteTask = async (id) => {
       
    try {
      const result = await HttpGetWithAuth(`/deleteTaskDetails/${id}`, localStorage.getItem("username"), localStorage.getItem("password"));
      if(result === "SUCCESS"){
          console.log("success")
          props.reload();
          
      }
  } catch (error) {
    console.log("some error occured")
  }
      }

      deleteTask(id);
   };


   const handleAboutPage = (id) =>{
       navigate("/about" , { state: { id: id } })
   }  
 

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`/${props.img}.jpg`} 
          alt="green iguana"
        />  
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           { 
           props.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           {props.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>{handleAboutPage(props.id)}} size="small" color="primary">
          Open
        </Button>
        <Button onClick={()=>{handleDelete(props.id)}} size="small" color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}