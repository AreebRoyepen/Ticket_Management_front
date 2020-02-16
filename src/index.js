import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css';
import * as serviceWorker from './serviceWorker';
import CreateEvent from './components/CreateEvent';
import LookupScreen from './components/LookupScreen';
import Payments from './components/Payments';
import ReturnTickets from './components/ReturnTickets';
import TicketAllocation from './components/TicketAllocation';
import Header from './components/Header';
import Login from './components/Login';
import Menu from './components/Menu';

const history = createBrowserHistory();

ReactDOM.render(

    <Router history = {history}>
        <Switch>
            <Route exact path = '/'   render = {() => <Login/>}/>
            <Route path = '/CreateEvent'   render = {() => <Header><CreateEvent/></Header>}/>
            <Route path = '/LookupScreen'   render = {() => <Header><LookupScreen/></Header>}/>
            <Route path = '/Payments'   render = {() => <Header><Payments/></Header>}/>
            <Route path = '/ReturnTickets'   render = {() => <Header><ReturnTickets/></Header>}/>
            <Route path = '/TicketAllocation'   render = {() => <Header><TicketAllocation/></Header>}/>
            <Route path = '/Menu'   render = {() => <Header><Menu/></Header>}/>

        </Switch>
    </Router>, document.getElementById('root'));

serviceWorker.register();
