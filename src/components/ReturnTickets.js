import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from "react-router-dom";

import Api from "../api/Api";
import "../styles/login.css";


export default function ReturnTickets() {

    let location = useLocation();
    let history = useHistory();
    const [setData] = useState([]);
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(0);
    const [ticketNumberT, setTicketNumberT] = useState(0);

    const [eventID] = useState(0);
    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)
    
    useEffect(()=>{

      

      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){
        let x = location.state.event.id
        let d = Api.getRequest("unallocated/" + x)
        setTickets(d.ticket)
      }

      fetchData()

      setLoadTickets(false)

    },[loadTickets, location])

 
    const returnTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "ticketNumberF": parseInt(ticketNumberF),
        "ticketNumberT": parseInt(ticketNumberT),
        "event" : eventID
      };

      async function fetchData(){

        let t = Api.deleteRequest("returnTicket/"+eventID+"/"+parseInt(ticketNumberF)) 
        setData(t.ticket)

      }

      
      fetchData()

      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, ticketNumberF, ticketNumberT, eventID, setData]); // update the callback if the state changes

    const bob = () =>{

      // console.log(ticketNumber)
      // console.log(location.state.id)
      history.goBack();

    }
    
    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">

          {location.state.event.name}<br/>
          amount of tickets left: {tickets}

      <TextField
        id="filled-number"
        label="ticket range from"
        type="number"
        onChange = {e => {setTicketNumberF(e.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        
      />

      <TextField
              id="filled-number"
              label="ticket range to"
              type="number"
              onChange = {e => {setTicketNumberT(e.target.value)}}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              
            />
      <button className = "button" type="button" disabled={isSending} onClick={bob}> Return Ticket</button>
  
      </div>
      </aside>
      </div>

    );
}
