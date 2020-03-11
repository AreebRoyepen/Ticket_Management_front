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
                                <input  onClick = {() => {history.push("/TicketAllocation",{event:x})  }} type="submit" value="Allocate Tickets" name="button"class="cardButtons  card-link u-float-right"/>
                                <input  onClick = {()=>{history.push("/ReturnTickets",{event:x})}}  type="submit" value="Return Tickets" name="button"class="cardButtons  card-link u-float-right"/>
                                <input  onClick = {()=>{history.push("/Payments",{event:x})}}  type="submit" value="Payments" name="button"class="cardButtons  card-link u-float-right"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
    );
}