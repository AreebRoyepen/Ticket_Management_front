import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";



import Api from "../api/Api";
import "../styles/login.css";


export default function EventPage() {
   
    let history = useHistory();
    let location = useLocation();

    console.log(location)
    
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

          let resp = await Api.putRequest("updateEvent/"+location.state.event.id, x)
          if(resp.message === "success"){
            console.log("success")
            history.goBack()
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/" , {last : "/EventPage", data : location.state})
        }else if(resp.message === "error"){
          console.log("error")
        }else if(resp.message === "no connection"){
          console.log("no connection")
        }
          
        }else{
          let resp = await Api.postRequest("addEvent",x)
          if(resp.message === "success"){
            console.log("success")
            history.goBack()
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/EventPage"})
        }else if(resp.message === "error"){
          console.log("error")
        }else if(resp.message === "no connection"){
          console.log("no connection")
        }
        }
      }
      fetchData()


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, to, from,price, name, location, history]); // update the callback if the state changes

    const back = () =>{

      history.push("/Tickets");


    }


    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">
          <button style={{opacity:0}}></button>
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
      
      <button className = "button" type="button" disabled={isSending} onClick={sendRequest} > Edit Event</button>
    :
    
    <button className = "button" type="button" disabled={isSending} onClick={sendRequest}> Create Event</button>
    }

<button className = "button" type="button" onClick={back}  style={{marginTop: "10px"}}> Cancel</button>

      </div>
      </aside>
      </div>

    );
}
