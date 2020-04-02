import React, { useState, useEffect } from "react";
import "../styles/eventCard.css";
import Api from "../api/Api";
import LazyLoad from 'react-lazyload';
import LazyLoadingIcon from "./LazyLoadingIcon";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
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

    let history = useHistory();

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
    },[history]);

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
                                <p>{x.name + " " + x.surname}</p>
                            </div>
                            <span className="card-header">{x.number}<span className="card-header u-float-right"> {x.email} </span>
                            </span>                 

                            <div className="card-sub-botton card-sub-show">
                                <input  onClick = {() => { console.log(x.id);  history.push("/UserPage",{x:x, edit:true})}} 
                                type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                                
                            {x.active ?
                                <input
                                type="submit"
                                value="Deactivate"
                                name="button"
                                className="cardButtons  card-link u-float-right"
                                id={JSON.stringify(x.active)}
                                />
                            :
                                <input
                                type="submit"
                                value="Activate"
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