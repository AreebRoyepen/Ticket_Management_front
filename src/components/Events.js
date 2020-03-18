import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import Searchbar from "./SearchComponents/SearchEvent";
import { useHistory } from "react-router-dom";
import "../styles/eventCard.css";

export default function Events(){

    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(false);
    let history = useHistory();

    useEffect(() => {

        async function fetchData(){
            let x = await Api.getRequest("events")
            if(x.message === "success"){
                setData(x.event);
                setConnection(true)
            }else if(x.message === "no connection"){
                console.log(x.message)
            }
            
        }

        fetchData()
    },[]);

    const popup = () => { 

        console.log("deleted apparently")

    }


    return (
        
        <div>

            {connection
            
            ?
            <div>
            <button onClick = {() => {  history.push("/EventPage", {id:null, edit:false}) }} className="funButton">Create Event</button>
            <Searchbar content={data}/>
            </div>

                :
                <div>

                    Loading
                </div>
                    
                    
                }



        </div>
    );
}