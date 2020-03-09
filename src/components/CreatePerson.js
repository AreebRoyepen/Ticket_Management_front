import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../api/Api";
import "../styles/login.css";


export default function CreatePerson() {

    const [data, setData] = useState();
    let history = useHistory();
    let location = useLocation();

    console.log(location)

    const [id, setId] = useState(0);
    const [edit, setEdit] = useState(false);
    const isLoad = useRef(false);
    
    

    
    const [isSending, setIsSending] = useState(false);
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    


    useEffect(() => {      
     return isMounted.current = false
    });


    useEffect(() => {      

      if(location.state.edit){
        setName(location.state.x.name)
      }
      
      

     });

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

      if(location.state.edit){


        Api.putRequest("updatePerson/"+location.state.x.id,x)
        .then(response => response.json())
        .then(data => console.log(data));


      }else{
        
      Api.postRequest("addPerson",x)
      .then(response => response.json())
      .then(data => {

          console.log(data)
      
      });
      }



      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, name, surname,number, email, edit, id]); // update the callback if the state changes

    const bob = () =>{


    }


    return (

      <div className="App">
        
        <aside className="profile-card">
          <div className="profile-bio">

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
          <button className = "button" type="button" disabled={isSending} onClick={bob}> Add Person</button>
  
      </div>
      </aside>
      </div>

    );
}
