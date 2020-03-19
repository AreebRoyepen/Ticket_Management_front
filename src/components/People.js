import React, { useState, useEffect } from "react";
import "../styles/eventCard.css";
import Api from "../api/Api";
import Searchbar from "./SearchComponents/SearchPeople";
import { useHistory } from "react-router-dom";

export default function People(){

    const [data, setData] = useState([]);
    const [connection, setConnection] = useState(false);
    let history = useHistory();

    useEffect(() => {
        async function fetchData(){

            let x = await Api.getRequest("person");
            if(x.message === "success"){
                setData(x.person)
                setConnection(true)
            }else if (x.message === "unauthorized"){
                localStorage.clear();
                history.push("/" , {last: "/People"})
            }else if(x.message === "error"){
              console.log("error")
            }else if(x.message === "no connection"){
              console.log("no connection")
            }

        }
      
        fetchData()
    },[]);

    return (
        <div>

            {connection
            
            ?
        
            <div>
            <button onClick = {() => {  history.push("/PersonPage",{id:null, edit:false})  }} className="funButton">Add Person</button>
            <Searchbar content={data}/>
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