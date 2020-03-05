import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";
const Menu = ({children}) => {
  return (
    <div>
      <input type="checkbox" id="menu-toggle" />
      <label id="trigger" for="menu-toggle" />
      <label id="burger" for="menu-toggle" />
      <ul id="menu">
        <li>
          <h4 id="CRUD">CREATE / UPDATE</h4>
        </li>
        <li>
          <Link to="/CreateEvent">Events</Link>
        </li>
        <li>
          <Link to="/LookupScreen">Lookup</Link>
        </li>
        <li>
          <Link to="/Payment">Payments</Link>
        </li>
        <li>
          <Link to="/ReturnTickets">Return Tickets</Link>
        </li>
        <li>
          <h4>LOOKUP</h4>
        </li>
        <li>
          <Link to="/TicketAllocation">Ticket Allocation</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default Menu;