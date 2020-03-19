import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../api/Api";
import "../styles/login.css";

export default function PersonPage() {

    let history = useHistory();
    let location = useLocation();

    console.log(location)
    
    const [isSending, setIsSending] = useState(false);
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    
    useEffect(() => {      

      if(location.state.edit){
        setName(location.state.x.name)
        setSurname(location.state.x.surname)
        setEmail(location.state.x.email)
        setNumber(location.state.x.number)
      }
      
      

     },[setName,location]);

    const sendRequest = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "name": name,
        "surname": surname,
        "number": number,
        "email": email        
      };

      async function fetchData(){

        if(location.state.edit){


          let resp = await Api.putRequest("updatePerson/"+location.state.x.id,x)
          if(resp.message === "success"){
            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/PersonPage"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }
          
  
  
        }else{
          
          let resp =await Api.postRequest("addPerson",x)
          console.log(resp)
          if(resp.message === "success"){
            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/PersonPage"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }
        
        
        }

      }

      fetchData()



      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, name, surname,number, email, location, history]); // update the callback if the state changes

    const back = () =>{

      history.goBack();

    }

    return (

      <div className="App">
        
        <aside className="profile-card">
          <div className="profile-bio">
          <button style={{opacity:0}}></button>
      <input
        type="text"
        className="sign-up-input"
        placeholder="Name"
        value = {name}
        onChange={ e => setName(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="Surname"
        value = {surname}
        onChange={ e => setSurname(e.target.value)}
      />
      <input
        type="number"
        className="sign-up-input"
        placeholder="Number"
        value = {number}
        onChange={ e => setNumber(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="email address"
        value = {email}
        onChange={ e => setEmail(e.target.value)}
      />
      {location.state.edit ? 
      
      <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Edit Person</button>
    :
    
    <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Add Person</button>
    }

<button className = "button" type="button" onClick={back}> Cancel</button>

      </div>
      </aside>
      </div>

    );
}
