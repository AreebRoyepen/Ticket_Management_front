import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Api from "../api/Api";
import "../styles/login.css";
import "../styles/validationForm.css";

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

export default function EventPage() {
   
    let history = useHistory();
    let location = useLocation();

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

    const [name, setName] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [price, setPrice] = useState("");


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
        "ticketPrice": parseFloat(price),
      };

      async function fetchData(){
        var time;
        if(location.state.edit){

          let resp = await Api.putRequest("updateEvent/"+location.state.event.id, x)
          if(resp.message === "success"){
            time = 3000
            setOpenSnackbar({severity : "success", message : "Successfully edited", open : true, time : time, closeType : successClose})
            
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/" , {last : "/EventPage", data : location.state})

          }else if(resp.message === "error"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "unknown error", open : true, time : time, closeType : errorClose})
            
          }else if(resp.message === "no connection"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})
            
          }else if(resp.message === "timeout"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : errorClose})
            
          }
          
        }else{
          let resp = await Api.postRequest("addEvent",x)
          if(resp.message === "success"){
            time = 3000
            setOpenSnackbar({severity : "success", message : "Successfully added", open : true, time : time, closeType : successClose})
            
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/EventPage"})

          }else if(resp.message === "error"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "unknown error", open : true, time : time, closeType : errorClose})
            
          }else if(resp.message === "no connection"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})

          }else if(resp.message === "timeout"){
            time = 6000
            setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : errorClose})
            
          }else{
            time = 6000
            setOpenSnackbar({severity : "warning", message : resp.message, open : true, time : time, closeType : errorClose})

          }
        }
      }
      fetchData()


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, to, from,price, name, location, history, errorClose, successClose]); // update the callback if the state changes

    const back = () =>{ history.push("/Events"); }
  
    const validateForm=() =>
    {
      var a = {
        "name": name,
        "to": parseInt(to),
        "from": parseInt(from),
        "ticketPrice": parseFloat(price)
      };

      console.log(a);
      if(!(/(null|undefined|^$|^\d+$)/).test(a.name) & (/(null|undefined|^$|^\d+$)/).test(a.from) 
      & (/(null|undefined|^$|^\d+$)/).test(a.to) & (/(null|undefined|^$|^\d+$)/).test(a.ticketPrice))
       {  
          return "trueValid";}
      
      return "falseValid";
    }


    return (
      
      <div>

      <div className={classes.root}>
      <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
        <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
      </div>

      <body className="bodyVal htmlVal spanVal">
      <form className="form ">
          <div>
          <label htmlFor="text" className="form__label">Event Name</label>
          <input required type="text" className="form__input inputValText" name="text" placeholder="Event Name" value = {name}
              onChange={ e => setName(e.target.value)} />
          <div className="form__requirements">
            Event Name is required
          </div>
          </div>

          <div>
          <label htmlFor="number" className="form__label">Ticket Start Number</label>
          <input required type="number" className="form__input inputValText" name="text" placeholder="2001"  value = {from}
             onChange={ e => setFrom(e.target.value)}/>
          <div className="form__requirements">
            Please enter in a valid ticket number
          </div>
          </div>

        <div>
          <label htmlFor="number" className="form__label">Ticket end number</label>
          <input required type="number" className="form__input inputValText" name="text" placeholder="2005"  value = {to}
             onChange={ e => setTo(e.target.value)}/>
          <div className="form__requirements">
            Please enter in a valid ticket number
          </div>
          </div>

           <div>
          <label htmlFor="number" className="form__label">Ticket Price (R)</label>
          <input required type="number" className="form__input inputValEmail" name="text" placeholder="100"  value = {price}
              onChange={ e => setPrice(e.target.value)} />
          <div className="form__requirements">
            Please enter a valid ticket price
          </div>
          </div>    
      </form>
      <div className="btn-group">
        
          {location.state.edit ? 
      
               <button id = {validateForm()} className = "button falseValid"  type="button" disabled={isSending} onClick={sendRequest} > Edit Event</button>
                  :
    
               <button id = {validateForm()} className = " falseValid button" type="button" disabled={isSending} onClick={sendRequest}> Create Event</button>
             }

             
        <button className = "button" type="button" onClick={back}> Cancel</button>
        </div>
      </body>

      </div>
    );
}
