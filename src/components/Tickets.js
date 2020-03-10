import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
import "../styles/eventCard.css";

export default function Tickets(){

    const [data, setData] = useState([]);
    let history = useHistory();

    useEffect(() => {
      Api.getRequest("events")
        .then(response => response.json())
        .then(data => {setData(data); console.log(data)});
    },[]);


    return (
        
        <div>
           <div>
            {data.reverse().map( x =>(


                <div key = {x.id}>
                    
                    <div className="container"> 
                    <div className="card">
                        <div class="card-body">
                            <div className="card-header">
                                <span className="card-lable">{x.name}</span>
                            </div>
                            <span className="card-header">Tickets {x.from} - {x.to}</span>
                            <div className="card-sub-botton">
                                {x.active
                                    ?
                                    <span className="card-sub-text card-lable">Status: Active</span>
                                    :
                                    <span className="card-sub-text card-lable">Status: Closed</span>
                                }
                            <span className="card-sub-text card-lable u-float-right">Ticket Price :  R {x.ticketPrice}</span>
                            </div>
                            <div className="card-sub-botton card-sub-show">
                                <button  onClick = {() => {history.push("/TicketAllocation",{event:x})  }} className="buttonCards card-sub-text card-link u-float-right">Allocate Tickets</button>
                                <button  onClick = {()=>{history.push("/ReturnTickets",{event:x})}} className="buttonCards card-sub-text card-link u-float-right">Return Tickets</button>
                                <button  onClick = {()=>{history.push("/Payments",{event:x})}} className="buttonCards card-sub-text card-link u-float-right">Payments</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
    );
}