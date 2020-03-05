import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Api from "../api/Api";
import "../styles/login.css";

export default function TicketAllocation() {

    const [data, setData] = useState([]);    

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(null);
    const [ticketNumberT, setTicketNumberT] = useState(null);

    const [person, setPerson] = useState(null);
    const [eventID, setEventID] = useState(0);

    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
   
      const response = await Api.getRequest("person");
      const persons = await response.json();

        if (active) {
          setOptions(persons);;
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


    const allocateTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "ticketNumberF": parseInt(ticketNumberF),
        "ticketNumberT": parseInt(ticketNumberT),
        "event": eventID,
        "person" : person.id
      };

      Api.postRequest("bulkAllocateTicket",x)
      .then(response => response.json())
      .then(data => {setData(data)});


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, ticketNumberF, ticketNumberT, eventID, person]); // update the callback if the state changes

    const bob = () => {
      console.log(person)
      console.log(ticketNumberF)
      console.log(ticketNumberT)
      
    }

    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">


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
        onChange = {e => setTicketNumberT(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        
      />

      <button className = "button" type="button" disabled={isSending} onClick={bob}> Allocate Ticket</button> 
  
      </div>
      </aside>
      </div>

    );

}
