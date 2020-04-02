import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
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


export default function PersonPage() {

  let history = useHistory();
  let location = useLocation();

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState({
    severity: "",
    message: "",
    open: false,
    time: 0,
    closeType: null
  });


  const [isSending, setIsSending] = useState(false);
  const isMounted = useRef(true)

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [close, setClose] = useState(false)

  useEffect(() => {

    if (location.state.edit) {
      setName(location.state.x.name)
      setSurname(location.state.x.surname)
      setEmail(location.state.x.email)
      setNumber(location.state.x.number)
    }



  }, [location]);


  const successClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (location.state.last) {
      history.push(location.state.last, location.state.data)
    } else {
      history.push("/People");
    }
  };

  const errorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({ ...openSnackbar, [openSnackbar.open]: false })
  };


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
      "email": email
    };

    async function fetchData() {

      var time = 3000

      if (location.state.edit) {

        let resp = await Api.putRequest("updatePerson/" + location.state.x.id, x)
        console.log(resp)
        if (resp.message === "success") {

          setOpenSnackbar({ severity: "success", message: "Successfully edited", open: true, time: time, closeType: successClose })

        } else if (resp.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: "/PersonPage", data: location.state })

        } else if (resp.message === "error") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

        } else if (resp.message === "no connection") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })
        } else if (resp.message === "timeout") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

        }



      } else {

        let resp = await Api.postRequest("addPerson", x)
        console.log(resp)
        if (resp.message === "success") {
          setOpenSnackbar({ severity: "success", message: "Successfully added", open: true, time: time, closeType: successClose })

        } else if (x.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: "/PersonPage" })

        } else if (x.message === "error") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

        } else if (x.message === "no connection") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

        } else if (resp.message === "timeout") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

        } else {
          time = 6000
          setOpenSnackbar({ severity: "warning", message: x.message, open: true, time: time, closeType: errorClose })

        }


      }

    }

    fetchData()



    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  }, [isSending, name, surname, number, email, location, history]); // update the callback if the state changes


  const validateForm = () => {
    var x = {
      "name": name,
      "surname": surname,
      "number": number,
      "email": email
    };
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log(x)
    if ((/^\D*$/.test(x.name)) && (/^\D*$/.test(x.surname)) && x.number.length > 9
      && emailRegex.test(x.email) && !(/(null|undefined|^$|^\d+$)/).test(x.name) && !(/(null|undefined|^$|^\d+$)/).test(x.surname))
      return "trueValid";
    return "falseValid";
  }


  const back = () => {
    if (location.state.last) {
      history.push(location.state.last, location.state.data)
    } else {
      history.push("/People");
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

      <body className="bodyVal htmlVal spanVal">

        <form className="form ">

          <div>
            <label htmlFor="text" className="form__label">First Name</label>
            <input required type="text" className="form__input inputValText" name="text" placeholder="John" pattern="^\D*$" value={name}
              onChange={e => setName(e.target.value)} />
            <div className="form__requirements">
              First name is required
          </div>
          </div>

          <div>
            <label htmlFor="text" className="form__label ">Last Name</label>
            <input required type="text" className="form__input inputValText" name="text" placeholder="Doe" pattern="^\D*$" value={surname}
              onChange={e => setSurname(e.target.value)} />
            <div className="form__requirements">
              Last name is required
          </div>
          </div>

          <div>
            <label htmlFor="text" className="form__label">Contact Number</label>
            <input required type="tel" className="form__input inputValText" name="text" placeholder="0841235678" pattern="[0-9a-zA-Z]{10,}" maxLength="10" value={number}
              onChange={e => setNumber(e.target.value)} />
            <div className="form__requirements">
              Please enter in a valid contact number
         </div>
          </div>

          <div>
            <label htmlFor="email" className="form__label">Email</label>
            <input required type="email" className="form__input inputValEmail" name="email" placeholder="example@aol.com" value={email}
              onChange={e => setEmail(e.target.value)} />
            <div className="form__requirements">
              Please enter a valid email address
            </div>
          </div>
        </form>
        <div className="btn-group">

          {location.state.edit ?

            <button id={validateForm()} className="button" type="button" disabled={isSending} onClick={sendRequest} > Edit Person</button>
            :

            <button id={validateForm()} className="button" type="button" disabled={isSending} onClick={sendRequest} > Add Person</button>
          }
          <button className="button" type="button" onClick={back}> Cancel</button>
        </div>
      </body>
    </div>

  );
}
