import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import { useLocation, useHistory } from "react-router-dom";

import Api from "../api/Api";
import "../styles/login.css";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";


export default function ReturnTickets() {

    let location = useLocation();
    let history = useHistory();
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(0);
    const [ticketNumberT, setTicketNumberT] = useState(0);
    const[bulk,setBulk] = useState(false);

    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)
    
    useEffect(()=>{

      

      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){
        let x = location.state.event.id
        let d = await Api.getRequest("unallocated/" + x)
        if(d.message === "success"){
          setTickets(d.ticket)
        }else if (x.message === "unauthorized"){
          localStorage.clear();
          history.push("/", {last : "/ReturnTickets"})
        }else if(x.message === "error"){
          console.log("error")
        }else if(x.message === "no connection"){
          console.log("no connection")
        }
      }

      fetchData()

      setLoadTickets(false)

    },[loadTickets, location, history])

 
    const returnTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "ticketNumberF": parseInt(ticketNumberF),
        "ticketNumberT": parseInt(ticketNumberT),
        "event" : location.state.event.id,
      };

      async function fetchData(){

        console.log(x)
        if(bulk){

          let t = await Api.deleteRequest("bulkReturn",x)
          console.log(t)
          if(t.message === "success"){

            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/ReturnTickets"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }

        }else{
          let t = await Api.deleteRequest("returnTicket/"+location.state.event.id+"/"+(ticketNumberF)) 
          if(t.message === "success"){

            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/ReturnTickets", data : location.state})
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

    }, [isSending, ticketNumberF, ticketNumberT, bulk, history, location]); // update the callback if the state changes

    const back = () =>{

      // console.log(ticketNumber)
      // console.log(location.state.id)
      history.push("/Tickets");


    }
    
    return (

      <div className="App">
        <aside className="profile-card">
          <div className="profile-bio">
          <h3>
          {location.state.event.name}<br/>
          unallocated tickets left: {tickets}
          </h3>
          <FormControlLabel

          control={

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Single</Grid>
            <Grid item>

              <Switch
                checked={bulk}
                onChange={e => setBulk(e.target.checked)}
                color = "#"
              />


            </Grid>
            <Grid item>Bulk</Grid>
          </Grid>
          }

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
        onChange = {e => {setTicketNumberT(e.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        
      />

        :
        <div/>
        }
      <button className = "button" type="button" disabled={isSending} onClick={returnTicket} style={{marginTop: "30px"}}> Return Ticket</button>

      <button className = "button" type="button" onClick={back} style={{marginTop: "30px"}} > Cancel</button>
  
      </div>
      </aside>
      </div>

    );
}
