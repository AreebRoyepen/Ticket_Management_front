import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
import "../styles/eventCard.css";

export default function Events(){

    const [data, setData] = useState([]);
    let history = useHistory();

    useEffect(() => {

        async function fetchData(){
            let x = await Api.getRequest("events")
            setData(x.event);
        }

        fetchData()
    },[]);

    const popup = () => { 

        console.log("deleted apparently")

    }


    return (
        
        <div>

<button onClick = {() => {  history.push("/EventPage", {id:null, edit:false}) }} id="CreateEvent">CreateEvent</button>
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

                            <input onClick = {() => {history.push("/EventPage",{event:x, edit: true})  }} type="submit" value="Edit Event" name="button"class="cardButtons  card-link u-float-right"/>
                            <input onClick = {()=>{popup()}} type="submit" value="Delete Event" name="button"class="cardButtons  card-link u-float-right"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
    );
}