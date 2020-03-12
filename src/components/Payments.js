import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import { useLocation, useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Api from "../api/Api";
import "../styles/login.css";


export default function Payments() {

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

    const[bulk,setBulk] = useState(false);
    
    useEffect(()=>{     

      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){
        let id = location.state.event.id
        let x = await Api.getRequest("unallocated/" + id)
        setTickets(x.ticket)
      }

      fetchData();

      setLoadTickets(false)

    },[loadTickets, location]);

 
    const returnTicket = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      
      async function fetchData(){

        if(bulk){

          let pay = {
	
            "event": eventID,
            "ticketNumberF": parseInt(ticketNumberF),
            "ticketNumberT": parseInt(ticketNumberT)
            
          }
          
          let x = Api.postRequest("bulkPayment",pay)
          setData(x.ticket)
          history.goBack()


        }else{
          let x = Api.getRequest("payment/"+eventID+"/"+parseInt(ticketNumberF))
          setData(x.ticket)
          history.goBack()
        }
        

      }

      fetchData();

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

        {bulk

          ?
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
          :
            <div/>
        }

      <button className = "button" type="button" disabled={isSending} onClick={bob}> Pay </button>
  
      </div>
      </aside>
      </div>

    );
}
