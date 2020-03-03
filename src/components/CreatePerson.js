import React, { useState, useEffect, useRef, useCallback } from "react";
import Api from "../api/Api";
import "../styles/login.css";


export default function CreatePerson() {

    const [data, setData] = useState([]);
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
     return isMounted.current = false
    },[]);

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

      Api.postRequest("addPerson",x)
      .then(response => response.json())
      .then(data => {setData(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, name, surname,number, email]); // update the callback if the state changes

    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">

      <input
        type="text"
        className="sign-up-input"
        placeholder="Name"
        onChange={ e => setName(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="Surname"
        onChange={ e => setSurname(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="Number"
        onChange={ e => setNumber(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="email address"
        onChange={ e => setEmail(e.target.value)}
      />
          <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Add Person</button>
  
      </div>
      </aside>
      </div>

    );
}
