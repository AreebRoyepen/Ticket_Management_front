import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Api from "../../../api/Api";
import "../../../styles/login.css";
import "../../../styles/validationForm.css";

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


export default function UserPage() {

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

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [role, setRole] = useState(null)
    const [close, setClose] = useState(false)

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)
    
    useEffect(() => {      

      if(location.state.edit){
        console.log(location.state.x)
        setName(location.state.x.name)
        setSurname(location.state.x.surname)
        setEmail(location.state.x.email)
        setNumber(location.state.x.number)
        setUsername(location.state.x.username)
        setRole(location.state.x.role)
      }
      
      

     },[location]);


     const successClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }  

      if(location.state.last){
        history.push(location.state.last , location.state.data)
      }else{
        history.push("/Users");
      }
    };

    const errorClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
    };

    useEffect(() => {
    
        if (!loading) {
          return undefined;
        }
    
        (async () => {
     
        let resp = await Api.getRequest("roles");
  
        if(resp.message === "success"){
          
          
          setOptions(resp.role);
          
  
        }else if (resp.message === "unauthorized"){
          localStorage.clear();
          history.push("/",  {last : location.pathname})
  
        }else{
          setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time :6000, closeType : errorClose})
        }
  
          
        })();

      }, [loading]);
  
  
    const sendRequest = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)
      // send the actual request

      var x = {
        "name": name,
        "surname": surname,
        "number": number,
        "email": email,
        "username":username,
        "password": password,
        "role":role.id
      };

      async function fetchData(){

        var time = 3000

        if(location.state.edit){

          let resp = await Api.putRequest("updateUser/"+location.state.x.id,x)
          console.log(resp)
          if(resp.message === "success"){
            
            setOpenSnackbar({severity : "success", message : "Successfully edited", open : true, time : time, closeType : successClose})
            
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : location.pathname, data: location.state})

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
            window.location.reload(false);
          }
          
  
  
        }else{
          
          let resp =await Api.postRequest("register",x)
          console.log(resp)
          if(resp.message === "success"){
            setOpenSnackbar({severity : "success", message : "Successfully added", open : true, time : time, closeType : successClose})
            
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : location.pathname})

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
            window.location.reload(false);
          }
        
        
        }

      }

      fetchData()



      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending,name, surname,number, email, location, history]); // update the callback if the state changes

    
    const validateForm=() =>
    {
      var x = {
        "name": name,
        "surname": surname,
        "number": number,
        "email": email,
        "password":password,
        "password2":password2,
        "role":role
      };
      var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      console.log(x)
      if((/^\D*$/.test(x.name)) && (/^\D*$/.test(x.surname)) && x.number.length >9
       && emailRegex.test(x.email) && !(/(null|undefined|^$|^\d+$)/).test(x.name) && !(/(null|undefined|^$|^\d+$)/).test(x.surname))
      {
        if(x.password+"" === x.password2+"" & x.password2.length > 0 )
        {
          if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\^*])(?=.{7,})/.test(x.password)))
          {
            if(!(x.role === undefined || x.role == null || x.role.length <= 0))
          {
            return "trueValid";
          }
          }
        }
      } 
     return "falseValid";
     /********************************* 
      (?=.*[a-z])	 must contain at least 1 lowercase letter
      (?=.*[A-Z])	 must contain at least 1 uppercase letter
      (?=.*[0-9])	 must contain at least 1 number
      (?=.*[!@#$%^&*]) must contain at least one special character
      (?=.{7,})greater that 7
     ************************************ */
    }
    
    
    const back = () =>{    
      if(location.state.last){
        history.push(location.state.last , location.state.data)
      }else{
        history.push("/Users");    
      }
    }

    return (
     
      <div className="users-scrolling"> 

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
		<label htmlFor="text" className="form__label">First Name</label>
		<input required type="text" className="form__input inputValText" name="text" placeholder="John" pattern="^\D*$"  value = {name}
        onChange={ e => setName(e.target.value)} />
		<div className="form__requirements">
      First name is required
    </div>
    </div>

    <div>
		<label htmlFor="text" className="form__label ">Last Name</label>
		<input required type="text" className="form__input inputValText" name="text" placeholder="Doe" pattern="^\D*$"  value = {surname}
        onChange={ e => setSurname(e.target.value)} />
		<div className="form__requirements">
      Last name is required
    </div>
    </div>

    <div>
		<label htmlFor="text" className="form__label">Contact Number</label>
		<input required type="tel" className="form__input inputValText" name="text" placeholder="0841235678"  pattern="[0-9a-zA-Z]{10,}" maxLength="10" value = {number}
        onChange={ e => setNumber(e.target.value)} />
		<div className="form__requirements">
      Please enter in a valid contact number
    </div>
    </div>

     <div>
		<label htmlFor="email" className="form__label">Email</label>
		<input required type="email" className="form__input inputValEmail" name="email" placeholder="example@aol.com"  value = {email}
        onChange={ e => setEmail(e.target.value)} />
		<div className="form__requirements">
      Please enter a valid email address
    </div>
    </div>

    <div>
		<label htmlFor="text" className="form__label ">Username</label>
		<input required type="text" className="form__input inputValText" name="text" placeholder="doe123" value = {username}
        onChange={ e => setUsername(e.target.value)} />
		<div className="form__requirements">
      username is required
    </div>
    </div>

    <div>
		<label htmlFor="password" className="form__label ">Password</label>
		<input required type="password" className="form__input inputValText" name="text" placeholder="1234" value = {password}  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#^*])(?=.{7,})"
        onChange={ e => setPassword(e.target.value)} />
    </div>

    <div>
		<label htmlFor="password" className="form__label ">Re-enter Password</label>
		<input required type="password" className="form__input inputValText" name="text" placeholder="1234" value = {password2}  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\^*])(?=.{7,})"
        onChange={ e => setPassword2(e.target.value)} />
		<div className="form__requirements">
      password is required, must match and must be greater than 7 character, 1 number one upercase and contain at least '!@#\^*'
    </div>
    </div>

    <Autocomplete
          style={{ width: 250 , marginBottom: "30px"}}
          open={open}
          onOpen={() => { setOpen(true); }}
          onClose={() => {setOpen(false); }}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={option => option.roleName}
          options={options}
          loading={loading}
          value = {role}
          onChange={(event, newValue) => { setRole(newValue); }}
          renderInput={params => (
            <TextField
              {...params}
              label="Select Role"
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

</form>
<div  className="btn-group">
   
   {location.state.edit ?             
        
        <button id = {validateForm()} className = "button" type="button" disabled={isSending} onClick={sendRequest} > Edit User</button>
      :
      
      <button id = {validateForm()} className = "button" type="button" disabled={isSending} onClick={sendRequest } > Add User</button>
      }
       <button className = "button" type="button" onClick={back}> Cancel</button>
   </div>
</body>


      </div>

    );
}
