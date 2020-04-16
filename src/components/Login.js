import React, { useState } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { purple } from "@material-ui/core/colors";
import Api from "../api/Api";
import "../styles/login.css";

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
  filledError : {
    color : purple,
    backgroundColor: purple
    
  }
}));


export default function Login ()  {

  let location = useLocation()
  let history = useHistory()

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState({
    severity : "",
    message : "",
    open : false,
    time : 0,
    closeType : null
  });

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [validPassword, setValidPassword] =useState("validate-password-false");
 
  const errorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
  };

  const handleClick = (event) => {

    async function fetchData(){

      var body = {
        "username" : username,
        "password" : password
      }

      console.log(body)

      let x = await Api.login("login", body)
      var time = 6000
      console.log(x)
      
      if(x.message === "success"){
        
        
        console.log(localStorage.token)
        //user in local storage is an string and must be parsed to an object to use in a component
        //user has all details to deal with authorization between pages
        console.log(JSON.parse(localStorage.user))

        //if they have been logged out this pushes them back to last page with state data to fill page
        if(location.state){
          history.push(location.state.last, location.state.data)
          setValidPassword("validate-password-false");
        }else{
          //otherwise, proceed as normal
          history.push("/Dashboard")
          setValidPassword("validate-password-false");
        }

        // here user feedback if username / password is wrong or does not exist (no differentiation for security)
      }else if (x.message === "unauthorized"){
          console.log(x.message)
          setValidPassword("validate-password-true");

      // below is other http errors
      }else if(x.message === "error"){
        setOpenSnackbar({severity : "error", message : "unknown error", open : true, time : time, closeType : errorClose})

      }else if(x.message === "no connection"){
        setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : errorClose})

      }else if(x.message === "timeout"){
        setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : errorClose})
        
      }
      
  }
  fetchData()

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

        <aside className="profile-card">
          <div className="profile-bio">
            <div>
              <img
                src="http://www.goodwoodmosque.org.za/images/logoImage.JPG"
                alt="logo"
                width="100"
                height="100"
              />
            </div>
            <form>
            <input
              type="text"
              className="sign-up-input"
              placeholder="ENTER USERNAME"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
              
            />
            <input
              type="password"
              className="sign-up-input"
              placeholder="ENTER PASSWORD"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <p  id={validPassword} style={{color:'red', marginTop:'-20px'}}>username or password incorrect</p>
            </form>
           
            <div>
              <button
                className="button"
                onClick={event => handleClick(event)}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </aside>
      </div>
    );
  
}
