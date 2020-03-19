import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from "react-router-dom";

import Api from "../api/Api";
import "../styles/login.css";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";

export default function TicketAllocation() {

    let location = useLocation();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(0);
    const [ticketNumberT, setTicketNumberT] = useState(0);
    const [bulk, setBulk] = useState(false)

    const [person, setPerson] = useState(null);
    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)


    useEffect(()=>{


      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){

        let x = location.state.event.id

        let t = await Api.getRequest("unallocated/" + x)
        if(t.message === "success"){
          setTickets(t.ticket)
        }else if (x.message === "unauthorized"){
          localStorage.clear();
          history.push("/",  {last : "/TicketAllocation"})
      }else if(x.message === "error"){
        console.log("error")
      }else if(x.message === "no connection"){
        console.log("no connection")
      }
               

      }

      fetchData()

      setLoadTickets(false)

    },[loadTickets, location])

    useEffect(() => {
      let active = true;
  
      if (!loading) {
        return undefined;
      }
  
      (async () => {
   
      let persons = await Api.getRequest("person");

      // const response = await fetch(
      //   "https://country.register.gov.uk/records.json?page-size=5000"
      // );
      //let persons =await response.json();


        if (active) {
          setOptions(persons.person);
          //setOptions(Object.keys(persons).map(key => persons[key].item[0]));

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



      async function fetchData(){

        if(bulk){

          var x = {
            "ticketNumberF": parseInt(ticketNumberF),
            "ticketNumberT": parseInt(ticketNumberT),
            "event": location.state.event.id,
            "person" : person.id
          };
          console.log(x)
          let t = await Api.postRequest("bulkAllocateTicket",x)
          console.log(t)
          if(t.message === "success"){

            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/",  {last : "/TicketAllocation"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }
        }else{

          var x = {
            "ticketNumber": parseInt(ticketNumberF),
            "event": location.state.event.id,
            "person" : person.id
          };

          let t = await Api.postRequest("allocateTicket",x)
          if(t.message === "success"){

            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/",  {last : "/TicketAllocation"})
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

    }, [isSending, ticketNumberF, ticketNumberT, person, bulk, history, location]); // update the callback if the state changes

    const back = () => {
      
      // console.log(ticketNumberF)
      // console.log(ticketNumberT)
      // console.log(location.state.id)
      history.goBack();
      
    }

    return (

      <div className="App">
        {console.log(location.state.event.id)}

        {console.log(person)}
        <aside className="profile-card">
          <div className="profile-bio">

          {location.state.event.name}<br/>
          amount of tickets left: {tickets}



          <FormControlLabel

          control={

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>

              <Switch
                checked={bulk}
                onChange={e => setBulk(e.target.checked)}
                color = "#"
              />


            </Grid>
            <Grid item>On</Grid>
          </Grid>
          }

          />


        <Autocomplete
          style={{ width: 250 }}
          open={open}
          onOpen={() => { setOpen(true); }}
          onClose={() => {setOpen(false); }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={option => option.name +" "+option.surname }
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
        label={bulk ?  "From" : "Ticket Number"}
        type="number"
        onChange = {e => {setTicketNumberF(e.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        
      />

        {bulk ?
              <TextField
              id="filled-number"
              label="To"
              type="number"
              onChange = {e => setTicketNumberT(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              
            />
          :
          <div/>
          }

      <button className = "button" type="button" disabled={isSending} onClick={allocateTicket}> Allocate Ticket</button> 
      <button className = "button" type="button" onClick={back}> Cancel</button>
  
      </div>
      </aside>
      </div>

    );

}
