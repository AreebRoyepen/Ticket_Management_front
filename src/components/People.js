import React, { useState, useEffect } from "react";
import Api from "../api/Api";

export default function People(){

    const [data, setData] = useState([]);

    useEffect(() => {
      Api.getRequest("person")
        .then(response => response.json())
        .then(data => setData(data));
    },[]);

    return (
        <div>

            {data.map( x =>(
                <div>
                    
                    <h1>{x.name + " " + x.surname} </h1>
                    <h2>number: {x.number}</h2>
                    <h2>email: {x.email}</h2>
            
                </div>
            ))}


        </div>
    );
}