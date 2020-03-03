import React, { useState, useEffect, useRef, useCallback } from "react";
import Api from "../api/Api";
import "../styles/login.css";


export default function TicketAllocation() {

    const [data, setData] = useState([]);
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumber, setTicketNumber] = useState(0);
    const [person, setPerson] = useState([]);
    const [name, setName] = useState("");

    const [eventID, setEventID] = useState(0);

    useEffect(() => {
     return isMounted.current = false
    },[]);

    const allocateTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "ticketNumber": parseInt(ticketNumber),
        "person": eventID,
        "event" : person.ID
      };

      Api.postRequest("allocateTicket",x)
      .then(response => response.json())
      .then(data => {setData(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, ticketNumber, eventID, person]); // update the callback if the state changes

    const findPerson = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "name" : name
      };

      Api.postRequest("personLikeName",x)
      .then(response => response.json())
      .then(data => {setPerson(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, name]); // update the callback if the state changes

    
    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">

      <input
        type="text"
        className="sign-up-input"
        placeholder="Person name"
        onChange={ e => setName(e.target.value)}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="ticket start number"
        onChange={ e => setTicketNumber(e.target.value)}
      />

      <button className = "button" type="button" disabled={isSending} onClick={allocateTicket}> Allocate Ticket</button>
  
      </div>
      </aside>
      </div>

    );
}
