import React from 'react'
import { useLocation } from 'react-router-dom';

const About = () => {
    
    const location = useLocation();
    const {id} = location.state || {};
  return (
    <div>About
        {id}
    </div>
  )
}

export default About