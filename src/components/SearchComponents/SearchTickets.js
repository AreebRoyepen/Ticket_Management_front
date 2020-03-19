import React,{Component, useState, useEffect} from 'react';
import "../../styles/eventCard.css";
import { useHistory } from "react-router-dom";


export default function SearchTickets (content) {

    const [initialItems, setInitialItems] = useState(content.content);
    const [items, setItems] = useState(content.content);

    let history = useHistory();

    function filterList  (event){
      let items = initialItems;
     console.log(items.length);
     console.log(event.target.value)
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      setItems(items);
    }


      return (
        <div>
          <form>
                <input  className ="searchBoxStyle" type="text" placeholder="Search" onChange={ e => filterList(e)}/>
          </form>

          <div>
            
            {items.map( x =>(

               

                <div key = {x.id}>
                    
                    <div className="container"> 
                    
                    <div className="card">
                        <div className="card-body" id ={JSON.stringify(x.active)}>
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
                            <input  onClick = {() => {history.push("/TicketAllocation",{event:x})  }} type="submit" value="Allocate" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            <input  onClick = {()=>{history.push("/ReturnTickets",{event:x})}} type="submit" value="Return" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            <input  onClick = {()=>{history.push("/Payments",{event:x})}}  type="submit" value="Pay" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>
        </div>
      );
    
};