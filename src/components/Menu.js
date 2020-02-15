import React from 'react';
import {Link} from 'react-router-dom';


const Menu = () => {

    const style = {
        display: 'inline-block',
        margin: 10
      };

    return (
            <div>
                <h3 style = {style} > <Link to = '/'>Log in</Link></h3>
                <h3 style = {style}> <Link to = '/CreateEvent'>Create Event</Link></h3>
                <h3 style = {style}> <Link to = '/LookupScreen'>Lookup Screen</Link></h3>
                <h3 style = {style}> <Link to = '/Payment'>Payments</Link></h3>
                <h3 style = {style}> <Link to = '/ReturnTickets'>Return Tickets</Link></h3>
                <h3 style = {style}> <Link to = '/TicketAllocation'>Ticket Allocation</Link></h3>

            </div>
    )



}

export default Menu;