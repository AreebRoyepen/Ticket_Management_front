import React, { useState, useEffect, useRef, useCallback }  from "react";
import { useLocation, useHistory } from "react-router-dom";
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

export default function ReportEndpoints(props) {

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

    const closeSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
    };

    useEffect(() => {

        const x = props.props

        if (isSending) return
  
        // update state
        setIsSending(true)
    
        // send the actual request 
        async function fetchData(){
            var time = 6000

            if(x.param2 == "download"){
                console.log("bob")
                setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                setOpenSnackbar({severity : "success", message : "Report to download shortly", open : true, time : time, closeType : closeSnack})

                if(x.endpoint == "eventsOutstanding"){

                    console.log("bob")
                    let t = await Api.reportDownloadRequest("eventsOutstanding",x.param1, x.param2) 
                    console.log(t)
                    if(t.message === "success"){
                        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                        setOpenSnackbar({severity : "success", message : "Report downloaded", open : true, time : time, closeType : closeSnack})

                        const url = window.URL.createObjectURL(new Blob([t.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        var date = new Date()
                        var filename = "REPORT " + x.param1 + " Events Outstanding Totals " + date.toDateString() +".pdf"
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
            
                    }else if (t.message === "unauthorized"){
                        localStorage.clear();
                        history.push("/", {last : location.pathname, data : location.state})
            
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
                }else if(x.endpoint == "whoOwesWhat"){

                    let t = await Api.reportDownloadRequest("whoOwesWhat",x.param1, x.param2) 
                    if(t.message === "success"){

                        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                        setOpenSnackbar({severity : "success", message : "Report downloaded", open : true, time : time, closeType : closeSnack})

                        const url = window.URL.createObjectURL(new Blob([t.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        var date = new Date()
                        var filename = "REPORT People Outstanding Totals for " + x.param1 + " Events " + date.toDateString() +".pdf"
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
        
                    }else if (t.message === "unauthorized"){
                        localStorage.clear();
                        history.push("/", {last : location.pathname, data : location.state})
            
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

                }else if(x.endpoint == "returnedTickets"){

                    let t = await Api.reportDownloadRequest("returnedTickets",x.param1, x.param2) 
                    if(t.message === "success"){

                        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                        setOpenSnackbar({severity : "success", message : "Report downloaded", open : true, time : time, closeType : closeSnack})
        
                        const url = window.URL.createObjectURL(new Blob([t.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        var date = new Date()
                        var filename = "REPORT Returned Ticket Totals for " + x.param1 + " Events " + date.toDateString() +".pdf"
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
        
                    }else if (t.message === "unauthorized"){
                        localStorage.clear();
                        history.push("/", {last : location.pathname, data : location.state})
            
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

            }else if (x.param2 == "email"){

                setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                setOpenSnackbar({severity : "success", message : "Email to be sent shortly", open : true, time : time, closeType : closeSnack})

                let t = await Api.reportEmailRequest(x.endpoint,x.param1, x.param2, x.email) 
                
                    console.log(t)
                    if(t.message === "success"){
                        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
                        setOpenSnackbar({severity : "success", message : t.data.message, open : true, time : time, closeType : closeSnack})
            
                    }else if (t.message === "unauthorized"){
                        localStorage.clear();
                        history.push("/", {last : location.pathname, data : location.state})
            
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
    
        }
        
        fetchData()
    
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
            setIsSending(false)
    
        }, [isSending, props]); // update the callback if the state changes

    
    return(
        
      <div>

        <div className={classes.root}>
          <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
            <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </div>


      </div>

    );
}