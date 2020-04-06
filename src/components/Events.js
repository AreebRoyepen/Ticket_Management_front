import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import Searchbar from "./SearchComponents/SearchEvent";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingIcon } from "./LoadingIcon";
import {ErrorPage} from "./temp/ErrorPage";
import "../styles/eventCard.css";

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

export default function Events(){

    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(false);
    const [error,setError] = useState(false)

    let history = useHistory();

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

        async function fetchAll(){
            let x = await Api.getRequest("events")
            if(x.message === "success"){
                setData(x.event);
                setConnection(true)
            }else if (x.message === "unauthorized"){
                localStorage.clear();
                history.push("/", {last: "/Events"})
            }else{
                setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : 6000, closeType : errorClose})
                setError(true)
              }
            
        }

        async function fetchActive(){
          let x = await Api.getRequest("availableEvents")
          if(x.message === "success"){
              setData(x.event);
              setConnection(true)
          }else if (x.message === "unauthorized"){
              localStorage.clear();
              history.push("/", {last: "/Events"})
          }else{
              setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : 6000, closeType : errorClose})
              setError(true)
            }
          
      }

      if(user){
        if(user.role.id === 1){
          fetchAll()
        }else{
          fetchActive()
        }
      }

        
    },[history, user]);

    const createEventBtn= () =>{
      if(user.role.id == 1)
     { return(
        <button onClick = {() => {  history.push("/EventPage", {id:null, edit:false}) }} 
        className="funButton headerButtons">CREATE EVENT</button>
      );}
      else{
        return(
          <button disabled style={{opacity:0}}className="funButton headerButtons">Can't create</button>
        );
      }
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

            {connection
            
            ?
            <div>
          
            <div>
                {createEventBtn()}
              </div>               
            <Searchbar content={data}/>
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