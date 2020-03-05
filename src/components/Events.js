import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import "../styles/eventCard.css";
import Menu from "./Menu";
import { Route } from "react-router-dom";
import ReturnTickets from "./ReturnTickets";
import TicketAllocation from "./TicketAllocation";
import Modal from "@material-ui/core/Modal";



export default function Events(){

    const [data, setData] = useState([]);
    const [openAlloc, setOpenAlloc] = useState();
    const [openReturn, setOpenReturn] = useState();
    const [closeAlloc, setCloseAlloc] = useState();
    const [closeReturn, setCloseReturn] = useState();


    useEffect(() => {
      Api.getRequest("events")
        .then(response => response.json())
        .then(data => {setData(data); console.log(data)});
    },[]);


    const handleCloseA = ()=>{
        setCloseAlloc(false);
    }
    const handleCloseR = ()=>{
        setCloseReturn(false);
    }
    return (
        
        <div>
            <Route exact path="/" render={() => <Menu />} />
            <button id="CreateEvent" class="button">CreateEvent</button>
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
                                <button  onClick = {() =>setOpenAlloc(true)} className="button card-sub-text card-link u-float-right">Allocate Tickets</button>
                                <button  onClick = {()=>setCloseReturn(true)} className="button card-sub-text card-link u-float-right">Return Tickets</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openAlloc}
                onClose={handleCloseA}
            >
                <TicketAllocation />
            </Modal>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openReturn}
                onClose={handleCloseR}
            >
                <ReturnTickets />
            </Modal>


        </div>
    );
}