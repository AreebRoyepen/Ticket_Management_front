import React, { useEffect } from "react";
import { Link , useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuUI from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import { TiTicket } from "react-icons/ti";
import {MdEvent, MdDashboard,MdPeople} from "react-icons/md";
import useModal from 'react-hooks-use-modal';

import "../styles/menu.css";

const useStyles = makeStyles(theme =>({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const modalStyle = {
  backgroundColor: 'white',
  padding: '40px 45px',
  marginLeft:"30px",
  marginRight:"40px",
  borderRadius: '10px',
  marginTop:"140px",
};


const maskStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
 
  bottom: 0,
  right: 0,
  backgroundColor: 'gray',
  zIndex: 100000
};


export default function Menu({children}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = React.useState(null)
  const [openM, setOpenModal] = React.useState()

  let history = useHistory();


  const [Modal, openModal, closeModal, isOpen] = useModal('root', {
    preventScroll: true,
    backgroundColor: '#fff',
    domNode:'cat'
  });

  const popup = () => (
    <Modal style={maskStyle}>
      <div style={maskStyle}>
        <div style={modalStyle}>
          <h1>Your Session Is About To Expire</h1>
          <p>Complete your transaction and log in again please</p>
          <input
            type="submit"
            value="Close"
            name="button"
            className="cardButtons"
            onClick={closeModal}
          />
        </div>
      </div>
    </Modal>
  );


  useEffect( () => {

    if(localStorage.user)
      setUser(JSON.parse(localStorage.user))
      setTimeout(() =>{ setOpenModal(openModal) }, (localStorage.expiration * 1000));    

  },[setUser])

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem className="menuHeader" ><TiTicket/>&nbsp;GIS Ticket Management</ListItem>
        <List>
          <ListItem> <MdDashboard className="iconStyling"/><Link className="menuText" to="/Dashboard">&nbsp;&nbsp;&nbsp;Dashboard</Link></ListItem>
        </List>
        <Divider/>
        <ListItem> <MdEvent className="iconStyling"/><Link className="menuText" to="/Events">&nbsp;&nbsp;&nbsp;Events</Link></ListItem>
        <ListItem> <MdPeople  className="iconStyling"/><Link className="menuText" to="/People">&nbsp;&nbsp;&nbsp;People</Link></ListItem>
        
        {user ?        
        adminPanel()
        :
        <div/>
        }

      </List>
    </div>
  );

  const adminPanel = () =>{

    if(user.role.id ==1)
    return (
      <ListItem> 
      <MdPeople  className="iconStyling"/>
      <Link className="menuText" to="/Admin">&nbsp;&nbsp;&nbsp;Admin</Link>
      </ListItem>
    );

  }

  return (
    <div>
      {localStorage.user ?

          <div className={classes.root}>
          {popup()}
          <AppBar id= "appBarColor" position="fixed">
            <Toolbar>
            <Button onClick={toggleDrawer('left', true)}><DehazeIcon id ="menuIcon"/></Button>
          <Drawer open={state.left} onClose={toggleDrawer('left', false)} children={sideList('left')}>
          </Drawer>
            <Typography variant="h6" align = "center" className={classes.title}>
              Ticket Management
              </Typography>
              
              <Button onClick={handleMenu} color="inherit">Hi, {user ? user.name : ""}</Button>

              <MenuUI
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick = {() => { history.push("/");   localStorage.clear(); }}> Log Out</MenuItem>
                  </MenuUI>

            </Toolbar>
          </AppBar>
          {children}
          </div>
    
    
      :

      //if they are not logged in they are booted out to log in page
      history.push("/")
      

      
      }


    </div>

  );
}