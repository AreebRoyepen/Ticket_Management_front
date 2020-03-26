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
            }else if (x.message === "unauthorized"){
                localStorage.clear();
                history.push("/",  {last : "/Tickets"})
            }else if(x.message === "error"){
              console.log("error")
            }else if(x.message === "no connection"){
              console.log("no connection")
            }
            
        }
      
        fetchData()
    },[history]);


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
            
            
            <div className="dots-container">
            <div className="dots">L</div>
            <div className="dots">o</div>
            <div className="dots">a</div>
            <div className="dots">d</div>
            <div className="dots">i</div>
            <div className="dots">n</div>
            <div className="dots">g</div>
          </div>
                }


        </div>
        
    );
}