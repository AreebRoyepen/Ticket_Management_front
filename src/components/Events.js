import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
import "../styles/eventCard.css";

export default function Events(){

    const [data, setData] = useState([]);
    let history = useHistory();

    useEffect(() => {
      Api.getRequest("events")
        .then(response => response.json())
        .then(data => {setData(data); console.log(data)});
    },[]);


    return (
        
        <div>

            <button onClick = {() => {  history.push("/CreateEvent") }} id="CreateEvent" class="button">CreateEvent</button>
           <div>
            {data.reverse().map( x =>(


                <div>
                    
                    <div className="container"> 
                    <div className="card">
                        <div class="card-body">
                            <div className="card-top">
                                <span className="card-lable">Event Name</span>
                            </div>
                            <span className="card-header">{x.name}</span>
                            <div className="card-sub-botton">
                            <span className="card-sub-text card-lable">Tickets {x.from} - {x.to}, Status: {x.active.toString()}</span>
                            <span className="card-sub-text card-lable u-float-right">Price :  R {x.ticketPrice}</span>
                            </div>
                            <div className="card-sub-botton card-sub-show">
                                <button  onClick = {() => { console.log(x.id);  history.push("/TicketAllocation",{id:x.id})  }} className="button card-sub-text card-link u-float-right">Allocate Tickets</button>
                                <button  onClick = {()=>{console.log(x.id);  history.push("/ReturnTickets",{id:x.id})}} className="button card-sub-text card-link u-float-right">Return Tickets</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
    );
}