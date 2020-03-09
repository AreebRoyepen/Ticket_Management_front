import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import "../styles/menu.css";;

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
        <ListItem> <Link className="menuText" to="/CreateEvent">Events</Link></ListItem>
        <ListItem>  <Link className="menuText" to="/LookupScreen">Lookup</Link></ListItem>
        <ListItem> <Link className="menuText" to="/Payments">Payments</Link></ListItem>
      </List>
      <Divider />
      <List>
      <ListItem> <Link className="menuText" to="/Dashboard">Dashboard</Link></ListItem>
        <ListItem>  <Link className="menuText" to="/#">b</Link></ListItem>
        <ListItem> <Link className="menuText" to="/#">c</Link></ListItem> 
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <AppBar id= "appBarColor" position="static">
        <Toolbar>
        <Button onClick={toggleDrawer('left', true)}><DehazeIcon id ="menuIcon"/></Button>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)} children={sideList('left')}>
      </Drawer>
         <Typography variant="h6" className={classes.title}>
          Ticket Management
          </Typography>
          
          <Button color="inherit">Admin</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}