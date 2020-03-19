import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import Searchbar from "./SearchComponents/SearchTickets";
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
                  <Searchbar content={data}/>
           <div>
        </div>

        </div>
        
            :
            
            
            <div class="dots-container">
            <div class="dots">L</div>
            <div class="dots">o</div>
            <div class="dots">a</div>
            <div class="dots">d</div>
            <div class="dots">i</div>
            <div class="dots">n</div>
            <div class="dots">g</div>
          </div>
                }


        </div>
        
    );
}