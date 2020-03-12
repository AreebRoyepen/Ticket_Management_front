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

<button onClick = {() => {  history.push("/EventPage", {id:null, edit:false}) }} className="funButton">Create Event</button>
           <div>
            {data.reverse().map( x =>(


                <div key = {x.id}>
                    
                    <div className="container"> 
                    <div className="card">
                        <div class="card-body">
                            <div className="card-header event-name">
                                <p>{x.name}</p>
                            </div>
                            <span className="card-header">Tickets {x.from} - {x.to} |&nbsp;&nbsp;
                            {x.active
                                    ?
                                    <span>Active |&nbsp;&nbsp;</span>
                                    :
                                    <span>Closed |&nbsp;&nbsp;</span>
                                }
                             <span>R {x.ticketPrice} </span>
                            </span>   
                            <div className="card-sub-botton card-sub-show">
                            <input onClick = {() => {history.push("/EventPage",{event:x, edit: true})  }} type="submit" value="EDIT" name="button"class="cardButtons  card-link u-float-right"/>
                            <input onClick = {()=>{popup()}} type="submit" value="DELETE" name="button"class="cardButtons  card-link u-float-right"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
    );
}