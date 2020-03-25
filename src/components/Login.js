import React, { useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import "../styles/login.css";
import Api from "../api/Api";

export default function Login ()  {

  let location = useLocation()
  let history = useHistory()

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
 
  const handleClick = (event) => {

    async function fetchData(){

      var body = {
        "username" : username,
        "password" : password
      }

      console.log(body)


      let x = await Api.login("login", body)
      console.log(x)
      if(x.message === "success"){
        console.log(localStorage.token)
        console.log(JSON.parse(localStorage.user))
        console.log(x)

        if(location.state){
          history.push(location.state.last, location.state.data)
        }else{
          history.push("/Dashboard")
        }


      }else if (x.message === "unauthorized"){
          console.log(x.message)
      }else if(x.message === "error"){
        console.log("error")
      }else if(x.message === "no connection"){
        console.log("no connection")
      }
      
  }
  fetchData()

  }


    
    return (
      <div className="App">
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
