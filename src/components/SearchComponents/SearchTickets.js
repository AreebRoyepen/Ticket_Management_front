import React,{ useState } from 'react';
import "../../styles/eventCard.css";
import { useHistory } from "react-router-dom";


export default function SearchTickets (content) {

    const [initialItems] = useState(content.content);
    const [items, setItems] = useState(content.content);

    let history = useHistory();

    function filterList  (event){
      let items = initialItems;
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      setItems(items);
    }


      return (
        <div>
                <input  className ="searchBoxStyle" type="search" placeholder="Search" onChange={ e => filterList(e)}/>
          <div>
          <div  style={{marginBottom:'30px'}}></div>
            {items.map( x =>(
              
              <div key = {x.id}>
                    
              <div className="container"> 
              
              <div className="card">
                  <div className="card-body" id ={JSON.stringify(x.active)}>
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