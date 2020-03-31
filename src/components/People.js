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
    },[history]);

    return (
        <div>

            {connection
            
            ?
        
            <div>
            <button onClick = {() => {  history.push("/PersonPage",{id:null, edit:false})  }} className="funButton headerButtons">ADD PERSON</button>
            <Searchbar content={data}/>
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