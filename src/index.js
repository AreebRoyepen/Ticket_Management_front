import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import EventPage from "./components/modules/events/EventPage";
import Events from "./components/modules/events/Events";

import PersonPage from "./components/modules/people/PersonPage";
import People from "./components/modules/people/People";

import Payments from "./components/modules/tickets/Payments";
import ReturnTickets from "./components/modules/tickets/ReturnTickets";
import TicketAllocation from "./components/modules/tickets/TicketAllocation";

import Menu from "./components/Menu";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

import Users from "./components/modules/admin/Users";
import UserPage from "./components/modules/admin/UserPage";
import Reports from "./components/modules/admin/Reports";

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

      <Route path="/Users" render={() => ( <Menu> <Users /> </Menu> )}/>

      <Route path="/UserPage" render={() => ( <Menu> <UserPage /> </Menu> )}/>

      <Route path="/Reports" render={() => ( <Menu> <Reports /> </Menu> )}/>


     
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
