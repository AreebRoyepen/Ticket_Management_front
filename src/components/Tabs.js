import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "../styles/tab.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginBottom: '20px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
   transition: '0.3s',
   marginLeft: '3%',
   marginRight : '3%'
  },
}));

export default function SimpleTabs(content) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [var3, setVar3] = useState(content.content);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Person" {...a11yProps(0)} />
          <Tab label="Outsanding Per Event" {...a11yProps(1)} />
          <Tab label="Action" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      {var3}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>Map Out</p>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
        <div><span>event name  | outstanding amount</span></div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        doing something 
        <div>
        <input
              type="submit"
              value="Do something"
              name="button"
              className="cardButtons"
              id="true"
            />
          <input
              type="submit"
              value="Do something"
              name="button"
              className="cardButtons"
              id="true"
            />
        </div>
        
      </TabPanel>
    </div>
  );
}
