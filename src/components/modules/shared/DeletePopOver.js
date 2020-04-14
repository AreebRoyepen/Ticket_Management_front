import React,{ useState, useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Api from "../../../api/Api";
import "../../../styles/eventCard.css";

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState({
    severity : "",
    message : "",
    open : false,
    time : 0,
    closeType : null
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [var3, setVar3] = useState(props.content);
  const [type, setType] = useState(props.type)
  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  let history = useHistory();
  let location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({...openSnackbar, [openSnackbar.open]:false})
    setAnchorEl(null)

    if(type === "Event"){
      console.log("to events")
      history.push("/Events")
    }else if(type === "Person"){
      history.push("/People")
    }
  };

  const deleteRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return

    // update state
    setIsSending(true)
    // send the actual request

    async function fetchData(){

      var time =5000

      if(type === "Event"){

        let resp = await Api.deleteRequest("deleteEvent/"+var3.id)
        console.log(resp)
        if(resp.message === "success"){
          setOpenSnackbar({severity : "success", message : "Successfully Deleted", open : true, time : time, closeType : close})
          
        }else if (resp.message === "unauthorized"){
          localStorage.clear();
          history.push("/", {last : "/Events", data: location.state})

        }else if(resp.message === "error"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "unknown error", open : true, time : time, closeType : close})

        }else if(resp.message === "no connection"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : close})
        }else if(resp.message === "timeout"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : close})
          
        }
        


      }else if(type === "Person"){
        
        let resp =await Api.deleteRequest("deletePerson/"+var3.id)
        console.log(resp)
        if(resp.message === "success"){
          setOpenSnackbar({severity : "success", message : "Successfully Deleted", open : true, time : time, closeType : close})
          
        }else if (resp.message === "unauthorized"){
          localStorage.clear();
          history.push("/", {last : "/People"})

        }else if(resp.message === "error"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "unknown error", open : true, time : time, closeType : close})

        }else if(resp.message === "no connection"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "Check your internet connection", open : true, time : time, closeType : close})

        }else if(resp.message === "timeout"){
          time = 6000
          setOpenSnackbar({severity : "error", message : "Request timed out. Please Try Again", open : true, time : time, closeType : close})
          
        }else{
          time = 6000
          setOpenSnackbar({severity : "warning", message : resp.message, open : true, time : time, closeType : close})

        }
      
      
      }

    }

    fetchData()



    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)

  }, [isSending, location, history]); // update the callback if the state changes


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className=" u-float-right">

      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick} className=" cardButtons">
        Delete
      </Button>
      <Popover className="popOverOverlay custopm-pop-over1 "
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.root}>
            <Snackbar open={openSnackbar.open} autoHideDuration={openSnackbar.time} onClose={openSnackbar.closeType}>
            <Alert onClose={openSnackbar.closeType} severity={openSnackbar.severity}>
              {openSnackbar.message}
            </Alert>
          </Snackbar>
        </div>

        <Typography className={classes.typography}>Are you sure you want to delete <strong>{var3.name}  {var3.surname}</strong>?</Typography>
        <input
          type="submit"
          value="confirm"
          name="button"
          onClick={deleteRequest}
          className="cardButtons event-right-delete card-link u-float-right"
          id={JSON.stringify(var3.active)}
        />
        <input
          type="submit"
          value="cancel"
          name="button"
          className="cardButtons event-right-delete  card-link u-float-right"
          id={JSON.stringify(var3.active)}
          onClick={handleClose}
        />
      </Popover>
    </div>
  );
}