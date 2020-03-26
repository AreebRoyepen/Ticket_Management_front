import React, { useState, useEffect, useRef, useCallback } from "react";
import TextField from '@material-ui/core/TextField';
import { useLocation, useHistory } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Api from "../api/Api";
import "../styles/login.css";


export default function Payments() {

    let location = useLocation();
    let history = useHistory();

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(0);
    const [ticketNumberT, setTicketNumberT] = useState(0);

    const[amount, setAmount] = useState(0);
    const [person, setPerson] = useState(null);
    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)
    const [allocated, setAllocated] = useState(0)

    const[bulk,setBulk] = useState(false);
    const [payOption, setPayOption] = useState(false);

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

    
    useEffect(()=>{     

      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){
        let id = location.state.event.id

        let unpaid = await Api.postRequest("tickets", {event : id})
        console.log(unpaid)
        if(unpaid.message==="success"){
 
          var falsestuff = unpaid.ticket.filter( key => {
            if (key.paid === false)
            return key
          })
          setAllocated(unpaid.ticket.length)
          setTickets(falsestuff.length)

        }else if (unpaid.message === "unauthorized"){
          localStorage.clear();
          history.push("/", {last: "/Payments"})
      }else if(unpaid.message === "error"){
        console.log("error")
      }else if(unpaid.message === "no connection"){
        console.log("no connection")
      }


        
      }

      fetchData();

      setLoadTickets(false)

    },[loadTickets, location, history]);

 
    const payment = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request
      
      async function fetchData(){

        if(!payOption){
          let x = await Api.getRequest("payByPerson/"+location.state.event.id+"/"+person.id+"/"+parseInt(amount))

          if(x.message === "success"){
  
            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/" , {last: "/Payments"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }

        }else{
          if(bulk){

            let pay = {
    
              "event": location.state.event.id,
              "ticketNumberF": parseInt(ticketNumberF),
              "ticketNumberT": parseInt(ticketNumberT),
              "amount": parseInt(amount)
              
            }

            console.log(pay)
            
            let x = await Api.postRequest("bulkPayment",pay)
            console.log(x)

            if(x.message === "success"){
  
              history.goBack()
            }else if (x.message === "unauthorized"){
              localStorage.clear();
              history.push("/" , {last: "/Payments"})
            }else if(x.message === "error"){
              console.log("error")
            }else if(x.message === "no connection"){
              console.log("no connection")
            }
  
          }else{
            let x = await Api.getRequest("payment/"+location.state.event.id+"/"+parseInt(ticketNumberF)+"/"+parseInt(amount))
            console.log(x)
            if(x.message === "success"){
  
              history.goBack()
            }else if (x.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last: "/Payments", data: location.state})
            }else if(x.message === "error"){
              console.log("error")
            }else if(x.message === "no connection"){
              console.log("no connection")
            }
          }
        }
        

      }

      fetchData();

      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, ticketNumberF, ticketNumberT, history, bulk, location, person, amount, payOption]); // update the callback if the state changes

    const back = () =>{

      history.push("/Tickets");

    }
    
    return (

      <div className="App">
                {console.log(person)}

        <aside className="profile-card">
          <div className="profile-bio">
          
          <h3>
          {location.state.event.name}<br/></h3>
          <h4>
          {allocated} allocated
          and {tickets} unpaid<br/>
          </h4>

          
            Pay by
          <br/>

          <FormControlLabel

            control={

            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>person</Grid>
              <Grid item>

                <Switch
                  checked={payOption}
                  onChange={e => setPayOption(e.target.checked)}
                  color = "#99cc33"
                />


              </Grid>
              <Grid item>ticket</Grid>
            </Grid>
            }

            />

          <TextField
       style={{marginTop: "15px"}}
        id="filled-number"
        label={"Amount"}
        type="number"
        onChange = {e => {setAmount(e.target.value)}}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        
      />



      {payOption ?
    
    <div>

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
     style={{marginTop: "15px"}}
      id="filled-number"
      label={bulk ?  "From" : "Ticket Number"}
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
    
    
    
    
    
    
    
    
    
            </div>
    
      :

      <Autocomplete
              style={{ width: 250 ,marginBottom: "15px",marginTop: "15px"}
            }
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
      
      
      
      }




      

      

      <button className = "button" type="button" disabled={isSending} onClick={payment}   style={{marginTop: "10px"}} > Pay </button>
      <button className = "button" type="button" onClick={back}  style={{marginTop: "10px"}}> Cancel</button>
  
      </div>
      </aside>
      </div>

    );
}
