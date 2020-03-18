import React, { Component, useState } from "react";
import { Redirect } from 'react-router-dom';
import "../styles/login.css";
import Api from "../api/Api";

export default function Login ()  {


  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isValid, setISValid] = useState();

  


  const renderRedirect = () => {
    if (isValid) {
      return <Redirect to='/Dashboard' />
    }
  }

  
  const handleClick = (event) => {

    async function fetchData(){

      var body = {
        "username" : username,
        "password" : password
      }

      console.log(body)


      let x = await Api.login("login", body)
      if(x.message === "success"){
        console.log(localStorage.token)
        setISValid(true)
        console.log(x)

      }else if (x.message === "unauthorized"){
          console.log(x.message)
      }else if ("no connection"){
        console.log(x)
        
      }
      
  }
  fetchData()

    //var apiBaseUrl = "http://localhost:3000/api/";
  }


    
    return (
      <div className="App">
        {renderRedirect()}
        <aside className="profile-card">
          <div className="profile-bio">
            <div>
              <img
                src="http://www.goodwoodmosque.org.za/images/logoImage.JPG"
                alt="logo"
                width="100"
                height="100"
              />
            </div>
            <form>
            <input
              type="text"
              className="sign-up-input"
              placeholder="Enter in your username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
              
            />
            <input
              type="password"
              className="sign-up-input"
              placeholder="Enter in your password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            </form>
           
            <div>
              <button
                className="button"
                onClick={event => handleClick(event)}
              >
                Sign in
              </button>
            </div>
          </div>
        </aside>
      </div>
    );
  
}
