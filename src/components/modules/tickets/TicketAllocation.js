import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import Icon from '@material-ui/icons/AddCircleTwoTone';
import {getRequest,postRequest} from "../../../api/Api";
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

export default function TicketAllocation() {

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
  const [bulk, setBulk] = useState(false)
  const [paid, setPaid] = useState(false)
  const [amount, setAmount] = useState()

  const [person, setPerson] = useState(null);
  const [loadTickets, setLoadTickets] = useState(false)
  const [tickets, setTickets] = useState(0)


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


    if (loadTickets) return

    setLoadTickets(true)

    async function fetchData() {

      let x = location.state.event.id
      var time = 6000

      let t = await getRequest("unallocated/" + x)
      if (t.message === "success") {
        setTickets(t.ticket)

      } else if (x.message === "unauthorized") {
        localStorage.clear();
        history.push("/", { last: location.pathname })

      } else if (x.message === "error") {
        setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

      } else if (x.message === "no connection") {
        setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })
      } else {
        setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })
      }


    }

    fetchData()

    setLoadTickets(false)

  }, [loadTickets, location, history])

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {

      let resp = await getRequest("person");

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


  const allocateTicket = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return

    // update state
    setIsSending(true)

    // send the actual request
    async function fetchData() {

      var time = 3000
      if (bulk) {

        var allocateBulk = {
          "ticketNumberF": parseInt(ticketNumberF),
          "ticketNumberT": parseInt(ticketNumberT),
          "event": location.state.event.id,
          "person": person.id
        };

        console.log(allocateBulk)
        let t = await postRequest("bulkAllocateTicket", allocateBulk)
        console.log(t)
        if (t.message === "success") {

          //can only pay for tickets if allocated successfully
          if (paid) {
            let pay = {

              "event": location.state.event.id,
              "ticketNumberF": parseInt(ticketNumberF),
              "ticketNumberT": parseInt(ticketNumberT),
              "amount": parseFloat(amount)

            }

            let p = await postRequest("bulkPayment", pay)
            console.log(p)
            if (p.message === "success") {
              var message = "Payment Successful"

              if (p.short)
                setOpenSnackbar({ severity: "warning", message: message + " R" + parseFloat(p.amount).toFixed(2) + " outstanding", open: true, time: time, closeType: successClose })
              else if (p.surplus)
                setOpenSnackbar({ severity: "success", message: message + " R" + parseFloat(p.amount).toFixed(2) + " surplus given", open: true, time: time, closeType: successClose })
              else
                setOpenSnackbar({ severity: "success", message: message, open: true, time: time, closeType: successClose })

            } else if (p.message === "unauthorized") {
              localStorage.clear();
              history.push("/", { last: location.pathname })

            } else if (p.message === "error") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

            } else if (p.message === "no connection") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

            } else if (p.message === "timeout") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

            }else{
              time = 6000
              setOpenSnackbar({severity : "warning", message : p.message, open : true, time : time, closeType : errorClose})
              window.location.reload(false);
            }
          } else {
            setOpenSnackbar({ severity: "success", message: "Allocation Successful", open: true, time: time, closeType: successClose })

          }

        } else if (t.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: location.pathname })

        } else if (t.message === "error") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

        } else if (t.message === "no connection") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

        } else if (t.message === "timeout") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

        } else {
          time = 6000
          setOpenSnackbar({ severity: "warning", message: t.message, open: true, time: time, closeType: errorClose })
          window.location.reload(false);
        }

      } else {

        var allocate = {
          "ticketNumber": parseInt(ticketNumberF),
          "event": location.state.event.id,
          "person": person.id
        };

        let t = await postRequest("allocateTicket", allocate)
        if (t.message === "success") {

          if (paid) {

            let x = {
              eventid: location.state.event.id,
              ticketNumber: parseInt(ticketNumberF),
              amount: parseFloat(amount)
            }

            let pay = await postRequest("payment", x)

            console.log(pay)
            if (pay.message === "success") {
              var message = "Payment Successful"

              if (pay.short)
                setOpenSnackbar({ severity: "warning", message: message + " R" + parseFloat(pay.amount).toFixed(2) + " outstanding", open: true, time: time, closeType: successClose })
              else if (pay.surplus)
                setOpenSnackbar({ severity: "success", message: message + " R" + parseFloat(pay.amount).toFixed(2) + " surplus given", open: true, time: time, closeType: successClose })
              else
                setOpenSnackbar({ severity: "success", message: message, open: true, time: time, closeType: successClose })

            } else if (pay.message === "unauthorized") {
              localStorage.clear();
              history.push("/", { last: location.pathname, data: location.state })

            } else if (pay.message === "error") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

            } else if (pay.message === "no connection") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

            } else if (pay.message === "timeout") {
              time = 6000
              setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

            }else{
              time = 6000
              setOpenSnackbar({severity : "warning", message : pay.message, open : true, time : time, closeType : errorClose})
              window.location.reload(false);
            }
          } else {
            setOpenSnackbar({ severity: "success", message: "Allocation Successful", open: true, time: time, closeType: successClose })

          }

        } else if (t.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: location.pathname, data: location.state })

        } else if (t.message === "error") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "unknown error", open: true, time: time, closeType: errorClose })

        } else if (t.message === "no connection") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Check your internet connection", open: true, time: time, closeType: errorClose })

        } else if (t.message === "timeout") {
          time = 6000
          setOpenSnackbar({ severity: "error", message: "Request timed out. Please Try Again", open: true, time: time, closeType: errorClose })

        } else {
          time = 6000
          setOpenSnackbar({ severity: "warning", message: t.message, open: true, time: time, closeType: errorClose })
          window.location.reload(false);
        }
      }

    }

    fetchData()


  }, [isSending, ticketNumberF, ticketNumberT, person, bulk, history, location, amount, paid, errorClose, successClose]); // update the callback if the state changes

  const back = () => {
    history.push("/Events");


  }


  const validateForm = () => {
  
    var x = {
      "ticketNumberF": parseInt(ticketNumberF),
      "amount": amount,
      "person": person,
      "paid":paid,
      "bulk":bulk,
      "ticketNumberT":ticketNumberT
    };

    if(x.person && ((/(null|undefined|^$|^\d+$)/).test(x.ticketNumberF)&& x.ticketNumberF>0))
    {
      if(bulk && !((/(null|undefined|^$|^\d+$)/).test(x.ticketNumberT)&& x.ticketNumberT>0))
      {
        return "falseValid";
      }
      if(x.paid)
      {
        if((/^\d+(\.\d{2})?$/).test(x.amount))
        {
          return "trueValid";
        }
        else
        {
          return "falseValid";
        }
      }
      else
      {
        return "trueValid";
      }
    }
    else
    {
      return "falseValid";
    } 
  }

  return (

    <div className="App" style = {{  overflowX: 'hidden'}}>

      <div className={classes.root}>
        <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
          <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </div>
      <body className="bodyVal htmlVal spanVal">
        <form className="form">
          <div className="">
          <h1 className="h1Dashboard">Ticket Allocation</h1>
            <h3>{location.state.event.name}<br />
          unallocated tickets left: {tickets}</h3>

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


            <div className="makeRow">

              <Autocomplete
                style={{ width: 250, marginBottom: "30px" }}
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
                        <React.Fragment >
                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <button onClick={e => history.push("/PersonPage", { last: "/TicketAllocation", id: null, edit: false, data: location.state })}
               id="add-person-icon" className="tinybutton" type="button" ><Icon /></button>


            </div>



            <TextField
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
                onChange={e => setTicketNumberT(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              :
              <div />
            }

            <FormControlLabel
              control={
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>

                    <Switch
                      checked={paid}
                      onChange={e => {
                        console.log(e.target.checked)
                        setPaid(e.target.checked)
                      }}
                      color="#"
                    />

                  </Grid>
                  <Grid item>Paid</Grid>
                </Grid>
              }
            />

            {paid ?

              <div>
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


              </div>
              :
              <p></p>

            }

          </div>
        </form>
          
        <div className="btn-group">
          
          {paid ?
            <button  id={validateForm()} className="button" type="button" disabled={isSending} onClick={allocateTicket} style={{ marginTop: "15px" }}>Allocate & Pay</button>
            :
            <button id={validateForm()}  className="button" type="button" disabled={isSending} onClick={allocateTicket} style={{ marginTop: "15px" }}>Allocate Ticket</button>
          }
          <button className="button" type="button" onClick={back} style={{ marginTop: "15px" }}> Cancel</button>
        </div>

      </body>
    </div>

  );

}