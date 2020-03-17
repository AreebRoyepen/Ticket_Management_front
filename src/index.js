import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import EventPage from "./components/EventPage";
import PersonPage from "./components/PersonPage";
import Events from "./components/Events";
import Payments from "./components/Payments";
import People from "./components/People";
import ReturnTickets from "./components/ReturnTickets";
import TicketAllocation from "./components/TicketAllocation";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Tickets from "./components/Tickets";
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>

      <Route exact path="/" render={() => <Login />} />

      <Route path="/EventPage" render={() => (<Menu> <EventPage /></Menu> )} />
      
      <Route path="/Dashboard" render={() => (<Menu> <Dashboard /></Menu> )} />

      <Route path="/PersonPage" render={() => ( <Menu> <PersonPage /> </Menu> )}/>

      <Route path="/Events" render={() => (<Menu> <Events /></Menu> )} />
      
      <Route path="/Payments" render={() => (<Menu> <Payments /></Menu> )} />

      <Route path="/People" render={() => ( <Menu> <People /> </Menu> )}/>

      <Route path="/ReturnTickets" render={() => (<Menu> <ReturnTickets /></Menu> )} />

      <Route path="/TicketAllocation" render={() => ( <Menu> <TicketAllocation /> </Menu> )}/>

      <Route path="/Tickets" render={() => ( <Menu> <Tickets /> </Menu> )}/>

      
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
