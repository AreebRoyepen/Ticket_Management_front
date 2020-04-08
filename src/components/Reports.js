import React, { useState, useEffect, useRef, useCallback }  from "react";
import { useLocation, useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Api from "../api/Api";
import SimpleTabs from "./Tabs";
import "../styles/validationForm.css";
import "../styles/login.css";
import "../styles/tab.css"

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

export default function Reports() {

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

    const [selectedOption, setSelectedOption] = useState("All");

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

      const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
      };

    const eventsOutstandingTotals = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
  
        // update state
        setIsSending(true)
  
        // send the actual request 
        async function fetchData(){
  
          var time = 6000
    
            let t = await Api.reportRequest("eventsOutstanding",selectedOption) 
            console.log(t)
            if(t.message === "success"){

              const url = window.URL.createObjectURL(new Blob([t.data]));
              const link = document.createElement('a');
              link.href = url;
              var date = new Date()
              var filename = "REPORT " + selectedOption + " Events Outstanding Totals " + date.toDateString() +".pdf"
              link.setAttribute('download', filename);
              document.body.appendChild(link);
              link.click();

              setOpenSnackbar({severity : "success", message : "Report to download shortly", open : true, time : time, closeType : closeSnack})

  
            }else if (t.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last : "/ReturnTickets", data : location.state})
  
            }else if(t.message === "error"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "no connection"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "timeout"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : closeSnack})
              
            }else{
              time = 6000
              setOpenSnackbar({severity : "warning", message : t.message, open : true, time : time, closeType : closeSnack})
  
            }
  
                  
  
        }
        
        fetchData()
  
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
  
      }, [isSending, history, location, closeSnack]); // update the callback if the state changes
  
    const whoOwesWhat = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
  
        // update state
        setIsSending(true)
  
        // send the actual request 
        async function fetchData(){
  
          var time = 6000
    
            let t = await Api.reportRequest("whoOwesWhat",selectedOption) 
            if(t.message === "success"){

              const url = window.URL.createObjectURL(new Blob([t.data]));
              const link = document.createElement('a');
              link.href = url;
              var date = new Date()
              var filename = "REPORT People Outstanding Totals for " + selectedOption + " Events " + date.toDateString() +".pdf"
              link.setAttribute('download', filename);
              document.body.appendChild(link);
              link.click();

              setOpenSnackbar({severity : "success", message : "Report to download shortly", open : true, time : time, closeType : closeSnack})

  
            }else if (t.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last : "/ReturnTickets", data : location.state})
  
            }else if(t.message === "error"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "no connection"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "timeout"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : closeSnack})
              
            }else{
              time = 6000
              setOpenSnackbar({severity : "warning", message : t.message, open : true, time : time, closeType : closeSnack})
  
            }
  
                  
  
        }
        
        fetchData()
  
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
  
      }, [isSending, history, location, closeSnack]); // update the callback if the state changes

    const returnedTickets = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
  
        // update state
        setIsSending(true)
  
        // send the actual request 
        async function fetchData(){
  
          var time = 6000
    
            let t = await Api.reportRequest("returnedTickets",selectedOption) 
            if(t.message === "success"){

              const url = window.URL.createObjectURL(new Blob([t.data]));
              const link = document.createElement('a');
              link.href = url;
              var date = new Date()
              var filename = "REPORT Returned Ticket Totals for " + selectedOption + " Events " + date.toDateString() +".pdf"
              link.setAttribute('download', filename);
              document.body.appendChild(link);
              link.click();

              setOpenSnackbar({severity : "success", message : "Report to download shortly", open : true, time : time, closeType : closeSnack})

  
            }else if (t.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last : "/ReturnTickets", data : location.state})
  
            }else if(t.message === "error"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Unknown Error", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "no connection"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : closeSnack})
  
            }else if(t.message === "timeout"){
              time = 6000
              setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : closeSnack})
              
            }else{
              time = 6000
              setOpenSnackbar({severity : "warning", message : t.message, open : true, time : time, closeType : closeSnack})
  
            }
  
                  
  
        }
        
        fetchData()
  
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
  
      }, [isSending, history, location, closeSnack]); // update the callback if the state changes

    return(
        
      <div>
        {console.log(selectedOption)}

        <div className={classes.root}>
          <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
            <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </div>

        <div className="makeRow">
          <div className="funButton ">
                Report on which Events:
          </div>
          <RadioGroup row value={selectedOption} onChange={handleChange}>
              <FormControlLabel value="All" 
              control={<Radio
                        color="default"
                        inputProps={{ 'aria-label': 'D' }}
                        />} 
              label="All" 
              labelPlacement="top"
              />
              <FormControlLabel value="Open" 
              control={<Radio
                        color="default"
                        inputProps={{ 'aria-label': 'D' }}
                        />} 
              label="Open" 
              labelPlacement="top"
              />
              <FormControlLabel value="Closed" 
              control={<Radio
                        color="default"
                        inputProps={{ 'aria-label': 'D' }}
                        />} 
              label="Closed" 
              labelPlacement="top"
              />
          </RadioGroup>
        </div>

          


        <div >
        <button
              className="funButton headerButtons"
              onClick = {() => eventsOutstandingTotals()}>
                Events Outstanding Totals
          </button>
        </div>

        <div >
            <button
              className="funButton headerButtons"
              onClick = {() => whoOwesWhat()}>
            People Outstanding Totals
          </button>
        </div>

        <div >
            <button
              className="funButton headerButtons"
              onClick = {() => returnedTickets()}>
            returnedTickets Totals
          </button>
        </div>

            

      </div>

    );
}