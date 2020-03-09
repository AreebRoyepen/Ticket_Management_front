import React, { useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Api from "../api/Api";
import "../styles/login.css";


export default function CreateEvent() {

    const [data, setData] = useState([]);
    
    let history = useHistory();
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [to, setTo] = useState(0);
    const [from, setFrom] = useState(0);
    const [price, setPrice] = useState(0);


    const sendRequest = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "name": name,
        "to": parseInt(to),
        "from": parseInt(from),
        "ticketPrice": parseInt(price),
        "active": true
      };

      Api.postRequest("addEvent",x)
      .then(response => response.json())
      .then(data => {setData(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, to, from,price, name]); // update the callback if the state changes

    const bob = () => {

      history.goBack()
    }

    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">

      <input
        type="text"
        className="sign-up-input"
        placeholder="Event name"
        onChange={ e => setName(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="ticket start number"
        onChange={ e => setFrom(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="Ticket end number"
        onChange={ e => setTo(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="ticket price"
        onChange={ e => setPrice(e.target.value)}
      />
          <button className = "button" type="button" disabled={isSending} onClick={bob}> Create Event</button>
  
      </div>
      </aside>
      </div>

    );
}
