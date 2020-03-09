import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import CreateEvent from "./components/CreateEvent";
import CreatePerson from "./components/CreatePerson"
import Events from "./components/Events";
import Payments from "./components/Payments";
import People from "./components/People";
import ReturnTickets from "./components/ReturnTickets";
import TicketAllocation from "./components/TicketAllocation";
import Tickets from "./components/Tickets"; 
import Menu from "./components/Menu";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>

      <Route exact path="/" render={() => <Login />} />

      <Route path="/CreateEvent" render={() => (<Menu> <CreateEvent /></Menu> )} />
      <Route path="/Dashboard" render={() => (<Menu> <Dashboard /></Menu> )} />

      <Route path="/CreatePerson" render={() => ( <Menu> <CreatePerson /> </Menu> )}/>

      <Route path="/Events" render={() => (<Menu> <Events /></Menu> )} />
      
      <Route path="/Payments" render={() => (<Menu> <Payments /></Menu> )} />

      <Route path="/People" render={() => ( <Menu> <People /> </Menu> )}/>

      <Route path="/ReturnTickets" render={() => (<Menu> <ReturnTickets /></Menu> )} />

      <Route path="/TicketAllocation" render={() => ( <Menu> <TicketAllocation /> </Menu> )}/>

      <Route path="/Tickets" render={() => (<Menu> <Tickets /></Menu> )} />
      
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
