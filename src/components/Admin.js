import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/eventCard.css";
import Api from "../api/Api";
import LazyLoad from 'react-lazyload';
import LazyLoadingIcon from "./LazyLoadingIcon";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";
import { LoadingIcon } from "./LoadingIcon";
import {ErrorPage} from "./temp/ErrorPage";

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
  
export default function People(){

    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(false);
    const [error,setError] = useState(false)

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    let history = useHistory();
    let location = useLocation();

    const [user, setUser] = useState(null)

    useEffect( () => {
      setUser(JSON.parse(localStorage.user))  
    },[setUser])

    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState({
      severity : "",
      message : "",
      open : false,
      time : 0,
      closeType : null
    });

    const errorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
      };

    useEffect(() => {
        async function fetchData(){

            let x = await Api.getRequest("users");
            if(x.message === "success"){
                setData(x.user)
                setConnection(true)
            }else if (x.message === "unauthorized"){
                localStorage.clear();
                history.push("/" , {last: "/People"})
            }else{
                setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : 6000, closeType : errorClose})
                setError(true)
              }

        }
      
        fetchData()
    },[history, errorClose]);


    const sendRequest = useCallback(async (user) => {
        // don't send again while we are sending
        if (isSending) return
  
        // update state
        setIsSending(true)
        // send the actual request
  
        var x = {
            "user" : user.id,
            "active": !user.active
        };
  
        async function fetchData(){
  
            var time = 3000
  
            let resp = await Api.postRequest("changeUserStatus",x)
            console.log(resp)
            if(resp.message === "success"){
              
              setOpenSnackbar({severity : "success", message : "Successfully edited", open : true, time : time, closeType : errorClose})
              
            }else if (resp.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last : "/Admin", data: location.state})
  
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
            
    
    
          
  
        }
  
        fetchData()
  
  
  
        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
          setIsSending(false)
  
      }, [isSending, location, history, errorClose]); // update the callback if the state changes
  

    return (
        <div>
            <div className={classes.root}>
            <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
                <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
                {openSnackbar.message}
                </Alert>
            </Snackbar>
            </div>

            {connection
            
            ?
        
            <div>
            <button onClick = {() => {  history.push("/UserPage",{id:null, edit:false})  }} className="funButton headerButtons">ADD USER</button>
            
            <div>        
                {data.map( x =>(

                    <LazyLoad key = {x.id} placeholder = {<LazyLoadingIcon />}>
                    <div key = {x.id}>                              

                    
                    <div className="container"> 
                    <div className="card">
                        <div className="card-body" id ={JSON.stringify(x.active)}>
                            <div className="card-header event-name">
                                <p>{x.id == user.id ? x.name + " " + x.surname +" (me)" : x.name + " " + x.surname}</p>
                            </div>
                            <span className="card-header">{x.number}<span className="card-header u-float-right"> {x.email} </span>
                            </span>                 

                            <div className="card-sub-botton card-sub-show">
                                <input  onClick = {() => { console.log(x.id);  history.push("/UserPage",{x:x, edit:true})}} 
                                type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                                
                                

                                {x.id == user.id ?
                                                    
                                <div/>          

                                :

                                <input
                                type="submit"
                                onClick = {() => sendRequest(x)}
                                value={x.active ?"Deactivate" : "Activate"}
                                name="button"
                                className="cardButtons  card-link u-float-right"
                                id={JSON.stringify(x.active)}
                                />

                                }
                            
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>

                    </LazyLoad>
                    
                ))}
            </div>
            
            </div>
            :

            <div>          

            {error ?
            <ErrorPage/>
            :
            <LoadingIcon/>
            }
    
            </div>

          
            }
        </div>
    );
}