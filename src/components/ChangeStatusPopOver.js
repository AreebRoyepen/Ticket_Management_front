import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "../styles/eventCard.css"

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SimplePopover(content) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [var3, setVar3] = useState(content.content);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      {var3.active ?"Close" : "Open"}
      </Button>
      <Popover className="popOverOverlay"
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
        <Typography className={classes.typography}>Are you sure you want to  {var3.active ?"close" : "open"} {var3.name}?</Typography>
        <input
          type="submit"
          value="confirm"
          name="button"
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
