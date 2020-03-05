import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import CreateEvent from "./components/CreateEvent";
import CreatePerson from "./components/CreatePerson"
import LookupScreen from "./components/LookupScreen";
import Payments from "./components/Payments";
import ReturnTickets from "./components/ReturnTickets";
import TicketAllocation from "./components/TicketAllocation";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Person from "./components/People";
import Events from "./components/Events";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route
        path="/CreateEvent"
        render={() => (
          <Menu>
            <CreateEvent />
          </Menu>
        )}
      />
      <Route
        path="/LookupScreen"
        render={() => (
          <Menu>
            <LookupScreen />
          </Menu>
        )}
      />
      <Route
        path="/Payments"
        render={() => (
          <Menu>
            <Payments />
          </Menu>
        )}
      />
      <Route
        path="/ReturnTickets"
        render={() => (
          <Menu>
            <ReturnTickets />
          </Menu>
        )}
      />
      <Route
        path="/TicketAllocation"
        render={() => (
          <Menu>
            <TicketAllocation />
          </Menu>
        )}
      />
      <Route
        path="/Menu"
        render={() => (
          <Menu>
            <Menu />
          </Menu>
        )}
      />
      <Route
        path="/Events"
        render={() => (
          <Menu>
            <Events />
          </Menu>
        )}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
