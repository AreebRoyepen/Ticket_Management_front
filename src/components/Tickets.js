import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import "../styles/card.css";

export default function Tickets(){

    const [data, setData] = useState([]);

    useEffect(() => {
      Api.getRequest("availableEvents")
        .then(response => response.json())
        .then(data => setData(data));
    },[]);

    return (
        <div>

            {data.map( x =>(

                    <div class="blog-card">
                    <div class="meta">
                    <ul class="details">
                        <li class="author"><a href="#">6 projects </a></li>
                        <li class="date">Estimated time of Completion 3 weeks</li>
                        <li class="tags">
                        <ul>
                            <li><a href="#">6 steps</a></li>
                            <li><a href="#">Web</a></li>
                        </ul>
                        </li>
                    </ul>
                    </div>
                        
                    <div class="description">
                    <h1>{x.name}</h1>
                    <h2>Price per Ticket: R {x.ticketPrice}</h2>

                    <p class="read-more">
                        <a href="#">Allocate Tickets</a>
                    </p>
                    
                    <p class="read-more">
                        <a href="#">Return Tickets</a>
                    </p>
                    </div>
                </div>
            ))}


        </div>
    );
}