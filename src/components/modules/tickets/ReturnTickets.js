import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Api from "../../../api/Api";
import "../../../styles/validationForm.css";
import "../../../styles/login.css";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function ReturnTickets() {

    let location = useLocation();
    let history = useHistory();

    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState({
      severity : "",
      message : "",
      open : false,
      time : 0,
      closeType : null
    });
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [ticketNumberF, setTicketNumberF] = useState(0);
    const [ticketNumberT, setTicketNumberT] = useState(0);
    const[bulk,setBulk] = useState(false);

    const[loadTickets, setLoadTickets] = useState(false)
    const [tickets, setTickets] = useState(0)
    

    const successClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      history.push("/Events");
    };

    const errorClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
    };

    useEffect(()=>{      

      if (loadTickets) return

      setLoadTickets(true)

      async function fetchData(){

        var time = 6000
        let x = location.state.event.id
        let d = await Api.getRequest("unallocated/" + x)
        if(d.message === "success"){
          setTickets(d.ticket)

        }else if (x.message === "unauthorized"){
          localStorage.clear();
          history.push("/", {last : location.pathname})

        }else if(x.message === "error"){
          setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : errorClose})
  
        }else if(x.message === "no connection"){
          setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})
        }else{
          time = 6000
          setOpenSnackbar({severity : "warning", message : x.message, open : true, time : time, closeType : errorClose})
          window.location.reload(false);
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

        var time = 3000
        var message = "Successfully Returned"
        console.log(x)
        if(bulk){

          let t = await Api.deleteRequest("bulkReturn",x)
          console.log(t)
          if(t.message === "success"){
            if(t.ticket){
              message = message + ", " + t.ticket
            }
            setOpenSnackbar({severity : "success", message : message, open : true, time : time, closeType : successClose})

          }else if (t.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : location.pathname})

          }else if(t.message === "error"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : errorClose})

          }else if(t.message === "no connection"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})

          }else if(t.message === "timeout"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : errorClose})
            
          }else{
            time = 6000
            setOpenSnackbar({severity : "warning", message : t.message, open : true, time : time, closeType : errorClose})
            window.location.reload(false);
          }

        }else{

          let t = await Api.deleteRequest("returnTicket/"+location.state.event.id+"/"+(ticketNumberF)) 
          if(t.message === "success"){

            if(t.ticket){
              message = message + ", " + t.ticket
            }
            setOpenSnackbar({severity : "success", message : message, open : true, time : time, closeType : successClose})

          }else if (t.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : location.pathname, data : location.state})

          }else if(t.message === "error"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : errorClose})

          }else if(t.message === "no connection"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})

          }else if(t.message === "timeout"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : errorClose})
            
          }else{
            time = 6000
            setOpenSnackbar({severity : "warning", message : t.message, open : true, time : time, closeType : errorClose})
            window.location.reload(false);
          }

        }        

      }
      
      fetchData()

    }, [isSending, ticketNumberF, ticketNumberT, bulk, history, location, successClose, errorClose]); // update the callback if the state changes

    const back = () =>{

      // console.log(ticketNumber)
      // console.log(location.state.id)
      history.push("/Events");


    }

    const validateForm = () => {
  
      var x = {
        "ticketNumberF": parseInt(ticketNumberF),
        "bulk":bulk,
        "ticketNumberT":ticketNumberT
      };

      if((/(null|undefined|^$|^\d+$)/).test(x.ticketNumberF)&& x.ticketNumberF>0)
      {
        if(bulk && !((/(null|undefined|^$|^\d+$)/).test(x.ticketNumberT)&& x.ticketNumberT>0))
        {
          return "falseValid";
        }
        else
        {
          return "trueValid";
        }
      }
      return "falseValid";
    }
  
    
    return (

      <div className="App">

        <div className={classes.root}>
            <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
            <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </div>
        <body className="bodyVal htmlVal spanVal">
        
        <form className="form">
        <h1 className="h1Dashboard">Return Tickets</h1>
          <div className="">
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
     
      </div>
      </form>
      <div className="btn-group"> 
         <button id={validateForm()} className = "button" type="button" disabled={isSending} onClick={returnTicket} style={{marginTop: "30px"}}> Return Ticket</button>
          <button className = "button" type="button" onClick={back} style={{marginTop: "30px"}} > Cancel</button>
      </div>
      </body>
      </div>

    );
}
