import React from 'react'
import axios from "axios";

export function HttpPostWithAuth(url, username, password,data) {
  return axios.post(url,data ,{
        auth: {
            username: username,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.data);
  
}




export function HttpGetWithAuth(url, username, password) {
    return axios.get(url ,{
          auth: {
              username: username,
              password: password,
          },
          headers: {
              "Content-Type": "application/json",
          },
      }).then(response => response.data);
    
  }
  
