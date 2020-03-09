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
    const [data, setData] = useState([]);
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumber, setTicketNumber] = useState(0);
    const [person, setPerson] = useState(null);

    const [eventID, setEventID] = useState(0);
    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)
    
    useEffect(()=>{

      let x = location.state.event.id

      if (loadTickets) return

      setLoadTickets(true)

      Api.getRequest("unallocated/" + x).
        then( response =>  response.json()).
        then( data =>{setTickets(data.message); console.log(data.message)})

        setLoadTickets(false)

    },[loadTickets])

 

    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
   
      const response = await Api.getRequest("person");
      const persons = await response.json();

        if (active) {
          setOptions(persons);
        }
      })();
  
      return () => {
        active = false;
      };
    }, [loading]);


    useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);

    const returnTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "ticketNumber": parseInt(ticketNumber),
        "person": person.id,
        "event" : eventID
      };

      Api.postRequest("returnTicket",x)
      .then(response => response.json())
      .then(data => {setData(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, ticketNumber, eventID, person]); // update the callback if the state changes

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
          <Autocomplete
          id="asynchronous-demo"
          style={{ width: 250 }}
          open={open}
          onOpen={() => { setOpen(true); }}
          onClose={() => {setOpen(false); }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={option => option.name +" " +option.surname }
          options={options}
          loading={loading}
          value = {person}
          onChange={(event, newValue) => { setPerson(newValue); }}
          renderInput={params => (
            <TextField
              {...params}
              label="Select Person"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
          />
        )}
      />

      <TextField
        id="filled-number"
        label="ticket range from"
        type="number"
        onChange = {e => {setTicketNumber(e.target.value)}}
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
