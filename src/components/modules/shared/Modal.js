import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 800,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    color:'#08533C',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ServerModal(content) {
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [var3, setVar3] = useState(content.content);
  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <h2 id="server-modal-title">Something Went Wrong, </h2>
          <p id="server-modal-description">{var3}</p>
        </div>
      </Modal>
    </div>
  );
}