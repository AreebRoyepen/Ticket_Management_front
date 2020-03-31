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
import {FaTicketAlt} from "react-icons/fa";

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

  let history = useHistory();

  useEffect( () => {

    if(localStorage.user)
      setUser(JSON.parse(localStorage.user))
      setTimeout(function(){ alert("token expired"); }, (localStorage.expiration * 1000));

    

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
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
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
  );
}