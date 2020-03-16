import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
import "../styles/eventCard.css";

export default function Tickets(){

    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(false);
    let history = useHistory();

    useEffect(() => {

        async function fetchData(){
          
            let x = await Api.getRequest("availableEvents")
            if(x.message === "success"){
                setData(x.event)
                setConnection(true)
            }
            
        }
      
        fetchData()
    },[]);


    return (
        
        <div>
            {connection
            
            ?
            
          
            <div>
                  <button className="funButton"  style={{opacity:0}}></button>
           
           <div>
            {data.reverse().map( x =>(


                <div key = {x.id}>
                    
                    <div className="container"> 
                    <div className="card">
                        <div className="card-body">
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
                                <input  onClick = {() => {history.push("/TicketAllocation",{event:x})  }} type="submit" value="Allocate" name="button"className="cardButtons  card-link u-float-right"/>
                                <input  onClick = {()=>{history.push("/ReturnTickets",{event:x})}}  type="submit" value="Return" name="button"className="cardButtons  card-link u-float-right"/>
                                <input  onClick = {()=>{history.push("/Payments",{event:x})}}  type="submit" value="Pay" name="button"className="cardButtons  card-link u-float-right"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

        </div>
        
            :
            
            
                <div>Loading</div>
                }


        </div>
        
    );
}