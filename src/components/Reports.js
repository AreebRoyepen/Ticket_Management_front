import React, { useState, useEffect, useRef, useCallback }  from "react";
import { useLocation, useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

    const [data, setData] = useState([])

      const closeSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
      };

    const ticketStuff = useCallback(async () => {
        // don't send again while we are sending
        if (isSending) return
  
        // update state
        setIsSending(true)
  
        // send the actual request
  
        var x = {

        };
  
        async function fetchData(){
  
          var time = 3000
          var message = "Successfully Returned"
          console.log(x)
    
            let t = await Api.postRequest("tickets",x) 
            if(t.message === "success"){

                setData(t.ticket)
  
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
  
      }, [data, isSending, history, location, closeSnack]); // update the callback if the state changes
  

    return(
        
      <div>
        {console.log(data)}

        <div className={classes.root}>
          <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
            <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>

        </div>
        <div style={{marginTop:"140px"}}></div>
        <input
            className="searchBoxStyle"
            type="search"
            placeholder="SEARCH"
          />
        <SimpleTabs content={"kl"}/>
        <SimpleTabs content={"cat"}/>
      </div>

    );
}