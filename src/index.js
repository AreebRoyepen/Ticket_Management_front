import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import CreateEvent from "./components/CreateEvent";
import LookupScreen from "./components/LookupScreen";
import Payments from "./components/Payments";
import ReturnTickets from "./components/ReturnTickets";
import TicketAllocation from "./components/TicketAllocation";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Menu from "./components/Menu";

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route
        path="/CreateEvent"
        render={() => (
          <Landing>
            <CreateEvent />
          </Landing>
        )}
      />
      <Route
        path="/LookupScreen"
        render={() => (
          <Landing>
            <LookupScreen />
          </Landing>
        )}
      />
      <Route
        path="/Payments"
        render={() => (
          <Landing>
            <Payments />
          </Landing>
        )}
      />
      <Route
        path="/ReturnTickets"
        render={() => (
          <Landing>
            <ReturnTickets />
          </Landing>
        )}
      />
      <Route
        path="/TicketAllocation"
        render={() => (
          <Landing>
            <TicketAllocation />
          </Landing>
        )}
      />
      <Route
        path="/Menu"
        render={() => (
          <Landing>
            <Menu />
          </Landing>
        )}
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
