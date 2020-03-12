import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Api from "../api/Api";
import "../styles/login.css";


export default function EventPage() {

    const [setData] = useState([]);
    
    let history = useHistory();
    let location = useLocation();
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {      

      if(location.state.edit){
        setName(location.state.event.name)
        setTo(location.state.event.to)
        setFrom(location.state.event.from)
        setPrice(location.state.event.ticketPrice)
      }
    }, [location])

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
      };

      async function fetchData(){
        if(location.state.edit){

          await Api.putRequest("updateEvent/"+location.state.event.id, x)
          history.goBack()
        }else{
          await Api.postRequest("addEvent",x)
          history.goBack()
        }
      }
      fetchData()


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, to, from,price, name, setData, location]); // update the callback if the state changes

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
        value = {name}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="ticket start number"
        onChange={ e => setFrom(e.target.value)}
        value = {from}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="Ticket end number"
        onChange={ e => setTo(e.target.value)}
        value  = {to}
      />
      <input
        type="text"
        className="sign-up-input"
        placeholder="ticket price"
        onChange={ e => setPrice(e.target.value)}
        value = {price}
      />
          
  
          {location.state.edit ? 
      
      <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Edit Event</button>
    :
    
    <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Create Event</button>
    }
      </div>
      </aside>
      </div>

    );
}
