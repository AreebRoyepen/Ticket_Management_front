import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
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

export default function Payments() {

  let location = useLocation();
  let history = useHistory();

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState({
    severity: "",
    message: "",
    open: false,
    time: 0,
    closeType: null
  });

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  const [ticketNumberF, setTicketNumberF] = useState(0);
  const [ticketNumberT, setTicketNumberT] = useState(0);

  const [amount, setAmount] = useState(0);
  const [person, setPerson] = useState(null);
  const [loadTickets, setLoadTickets] = useState(false)
  const [tickets, setTickets] = useState(0)
  const [allocated, setAllocated] = useState(0)

  const [bulk, setBulk] = useState(false);
  const [payOption, setPayOption] = useState(false);


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
    setOpenSnackbar({ ...openSnackbar, [openSnackbar.open]: false })
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      let resp = await Api.getRequest("person");

      if (resp.message === "success") {

        if (active) {
          setOptions(resp.person);
        }

      } else if (resp.message === "unauthorized") {
        localStorage.clear();
        history.push("/", { last: location.pathname })

      } else {
        setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: 6000, closeType: errorClose })
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {

    if (loadTickets) return

    setLoadTickets(true)

    async function fetchData() {
      let id = location.state.event.id

      let unpaid = await Api.postRequest("tickets", { event: id })
      console.log(unpaid)
      var time = 6000

      if (unpaid.message === "success") {

        var falsestuff = unpaid.ticket.filter(key => {
          if (key.paid === false)
            return key
        })
        setAllocated(unpaid.ticket.length)
        setTickets(falsestuff.length)

      } else if (unpaid.message === "unauthorized") {
        localStorage.clear();
        history.push("/", { last: location.pathname })

      } else if (unpaid.message === "error") {
        setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

      } else if (unpaid.message === "no connection") {
        setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

      } else {
        setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })
      }



    }

    fetchData();

    setLoadTickets(false)

  }, [loadTickets, location, history]);


  const payment = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return

    // update state
    setIsSending(true)

    // send the actual request

    async function fetchData() {

      var time = 3000

      if (!payOption) {

        let x = {

          eventid: location.state.event.id,
          personid: person.id,
          amount: parseFloat(amount)

        }

        let resp = await Api.postRequest("payByPerson", x)

        if (resp.message === "success") {

          var message = "Payment Successful"

          if (resp.short)
            setOpenSnackbar({ severity: "warning", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " outstanding", open: true, time: time, closeType: successClose })
          else if (resp.surplus)
            setOpenSnackbar({ severity: "success", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " surplus given", open: true, time: time, closeType: successClose })
          else
            setOpenSnackbar({ severity: "success", message: message, open: true, time: time, closeType: successClose })

        } else if (resp.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: location.pathname })

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

        if (bulk) {

          let pay = {

            "event": location.state.event.id,
            "ticketNumberF": parseInt(ticketNumberF),
            "ticketNumberT": parseInt(ticketNumberT),
            "amount": parseFloat(amount)

          }

          console.log(pay)

          let resp = await Api.postRequest("bulkPayment", pay)
          console.log(resp)

          if (resp.message === "success") {
            time = 3000
            var message = "Payment Successful"


            if (resp.short)
              setOpenSnackbar({ severity: "warning", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " outstanding", open: true, time: time, closeType: successClose })
            else if (resp.surplus)
              setOpenSnackbar({ severity: "success", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " surplus given", open: true, time: time, closeType: successClose })
            else
              setOpenSnackbar({ severity: "success", message: message, open: true, time: time, closeType: successClose })

          } else if (resp.message === "unauthorized") {
            localStorage.clear();
            history.push("/", { last: location.pathname })

          } else if (resp.message === "error") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

          } else if (resp.message === "no connection") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

          } else if (resp.message === "timeout") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

          } else {
            time = 6000
            setOpenSnackbar({ severity: "warning", message: resp.message, open: true, time: time, closeType: errorClose })

          }

        } else {

          let x = {
            eventid: location.state.event.id,
            ticketNumber: parseInt(ticketNumberF),
            amount: parseFloat(amount)
          }

          let resp = await Api.postRequest("payment", x)
          console.log(resp)
          if (resp.message === "success") {
            time = 3000
            var message = "Payment Successful"

            if (resp.short)
              setOpenSnackbar({ severity: "warning", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " outstanding", open: true, time: time, closeType: successClose })
            else if (resp.surplus)
              setOpenSnackbar({ severity: "success", message: message + " R" + parseFloat(resp.amount).toFixed(2) + " surplus given", open: true, time: time, closeType: successClose })
            else
              setOpenSnackbar({ severity: "success", message: message, open: true, time: time, closeType: successClose })

          } else if (resp.message === "unauthorized") {
            localStorage.clear();
            history.push("/", { last: location.pathname, data: location.state })

          } else if (resp.message === "error") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

          } else if (resp.message === "no connection") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

          } else if (resp.message === "timeout") {
            time = 6000
            setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

          } else {
            time = 6000
            setOpenSnackbar({ severity: "warning", message: resp.message, open: true, time: time, closeType: errorClose })

          }
        }
      }


    }

    fetchData();

    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  }, [isSending, ticketNumberF, ticketNumberT, history, bulk, location, person, amount, payOption, successClose, errorClose]); // update the callback if the state changes

  const back = () => { history.push("/Events"); }

  const validateForm = () => {
  
    var x = {
      "ticketNumberF": parseInt(ticketNumberF),
      "amount": amount,
      "person": person
    };
    if( (/^\d+(\.\d{2})?$/).test(x.amount) &&(x.person ||  ((/(null|undefined|^$|^\d+$)/).test(x.ticketNumberF)&& x.ticketNumberF>0)))
     {  
        return "trueValid";
      }
    return "falseValid";
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

      {console.log(person)}
      <body className="bodyVal htmlVal spanVal">
        <form className="form">
        <h1 className="h1Dashboard">Payments</h1>
          <div>

            <h3>
              {location.state.event.name}<br /></h3>
            <h4>
              {allocated} allocated
          and {tickets} unpaid<br />
            </h4>

            Pay by
          <br />

            <FormControlLabel
              control={
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>person</Grid>
                  <Grid item>

                    <Switch
                      checked={payOption}
                      onChange={e => setPayOption(e.target.checked)}
                      color="#08533C"
                    />

                  </Grid>
                  <Grid item>ticket</Grid>
                </Grid>
              }
            />

            <TextField
              style={{ marginTop: "15px" }}
              id="filled-number"
              label={"Amount"}
              type="number"
              onChange={e => { setAmount(e.target.value) }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"

            />



            {payOption ?

              <div>

                <FormControlLabel
                  control={
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>Single</Grid>
                      <Grid item>

                        <Switch
                          checked={bulk}
                          onChange={e => setBulk(e.target.checked)}
                          color="#"
                        />

                      </Grid>
                      <Grid item>Bulk</Grid>
                    </Grid>
                  }
                />

                <TextField
                  style={{ marginTop: "15px" }}
                  id="filled-number"
                  label={bulk ? "From" : "Ticket Number"}
                  type="number"
                  onChange={e => { setTicketNumberF(e.target.value) }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />

                {bulk ?
                  <TextField
                    id="filled-number"
                    label="To"
                    type="number"
                    onChange={e => { setTicketNumberT(e.target.value) }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                  :
                  <div />
                }

              </div>

              :

              <Autocomplete
                style={{ width: 250, marginBottom: "15px", marginTop: "15px" }
                }
                open={open}
                onOpen={() => { setOpen(true); }}
                onClose={() => { setOpen(false); }}
                getOptionSelected={(option, value) => option.name === value.name}
                getOptionLabel={option => option.name + " " + option.surname}
                options={options}
                loading={loading}
                value={person}
                onChange={(event, newValue) => { setPerson(newValue); }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Person"
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

            }
          </div>
        </form>
        <div className="btn-group">
          {amount?
             <button id={validateForm()}  className="button" type="button" disabled={isSending} onClick={payment} style={{ marginTop: "10px" }} > Pay </button>: <div></div>
          }
          
          <button className="button" type="button" onClick={back} style={{ marginTop: "10px" }}> Cancel</button>
        </div>


      </body>
    </div>

  );
}