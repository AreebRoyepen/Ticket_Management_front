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
    const[paid, setPaid] = useState(false)

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

        if (active) {
          setOptions(persons.person);
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

            console.log("IN BULK")
            var allocateBulk = {
              "ticketNumberF": parseInt(ticketNumberF),
              "ticketNumberT": parseInt(ticketNumberT),
              "event": location.state.event.id,
              "person" : person.id
            };

            console.log(allocateBulk)
            let t = await Api.postRequest("bulkAllocateTicket",allocateBulk)
            console.log(t)
            if(t.message === "success"){

              console.log("In success")

              //can only pay for tickets if allocated successfully
              if(paid){
                console.log("in paid")
                  let pay = {
      
                    "event": location.state.event.id,
                    "ticketNumberF": parseInt(ticketNumberF),
                    "ticketNumberT": parseInt(ticketNumberT)
                    
                  }
                  
                  let p = await Api.postRequest("bulkPayment",pay)
                  console.log(p)
                  if(p.message === "success"){
        
                    history.goBack()
                  }else if (p.message === "unauthorized"){
                    localStorage.clear();
                    history.push("/" , {last: "/Payments"})
                  }else if(p.message === "error"){
                    console.log("error")
                  }else if(p.message === "no connection"){
                    console.log("no connection")
                  }
                }else{
                  history.goBack()
                }

            }else if (t.message === "unauthorized"){
              localStorage.clear();
              history.push("/",  {last : "/TicketAllocation"})
            }else if(t.message === "error"){
              console.log("error")
            }else if(t.message === "no connection"){
              console.log("no connection")
            }


          
        }else{

          var allocate = {
            "ticketNumber": parseInt(ticketNumberF),
            "event": location.state.event.id,
            "person" : person.id
          };

          let t = await Api.postRequest("allocateTicket",allocate)
          if(t.message === "success"){

            if(paid){
              let pay = await Api.getRequest("payment/"+location.state.event.id+"/"+parseInt(ticketNumberF))
              if(pay.message === "success"){

                history.goBack()
              }else if (pay.message === "unauthorized"){
                localStorage.clear();
                history.push("/", {last: "/Payments", data: location.state})
              }else if(pay.message === "error"){
                console.log("error")
              }else if(pay.message === "no connection"){
                console.log("no connection")
              }
            }else{
              history.goBack()

            }

          }else if (t.message === "unauthorized"){
            localStorage.clear();
            history.push("/",  {last : "/TicketAllocation", data : location.state})
          }else if(t.message === "error"){
            console.log("error")
          }else if(t.message === "no connection"){
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
      history.push("/Tickets");

      
    }

    return (

      <div className="App">
        {console.log(location.state.event.id)}

        {console.log(person)}
        <aside className="profile-card">
          <div className="profile-bio">

          <h3>{location.state.event.name}<br/>
          unallocated tickets left: {tickets}</h3>



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


        <Autocomplete
          style={{ width: 250 },{marginBottom: "30px"}}
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

          <FormControlLabel

          control={

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>

              <Switch
                checked={paid}
                onChange={e => {console.log(e.target.checked)
                  setPaid(e.target.checked)}}
                color = "#"
              />


            </Grid>
            <Grid item>Paid</Grid>
          </Grid>
          }

          />

      {paid ?
      <button className = "button" type="button" disabled={isSending} onClick={allocateTicket} style={{marginTop: "30px"}}>Allocate & Pay</button> 

    
      :
      <button className = "button" type="button" disabled={isSending} onClick={allocateTicket} style={{marginTop: "30px"}}>Allocate Ticket</button> 

      
      }
      <button className = "button" type="button" onClick={back} style={{marginTop: "30px"}}> Cancel</button>
  
      </div>
      </aside>
      </div>

    );

}
