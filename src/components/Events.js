import React, { useState, useEffect } from "react";
import Api from "../api/Api";

export default function Events(){

    const [data, setData] = useState([]);

    useEffect(() => {
      Api.getRequest("events")
        .then(response => response.json())
        .then(data => setData(data));
    },[]);

    return (
        <div>

            {data.map( x =>(
                <div>
                    
                    <h1>{x.name} </h1>
                    <h2>price: R {x.ticketPrice}</h2>
            
                </div>
            ))}


        </div>
    );
}