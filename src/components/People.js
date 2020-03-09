import React, { useState, useEffect } from "react";
import "../styles/eventCard.css";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";

export default function People(){

    const [data, setData] = useState([]);
    let history = useHistory();

    useEffect(() => {
      Api.getRequest("person")
        .then(response => response.json())
        .then(data => setData(data));
    },[]);

    return (
        <div>
            <button onClick = {() => {  history.push("/CreatePerson",{id:null, edit:false})  }} id="CreateEvent" handle class="button">Add Person</button>
            {data.map( x =>(
                <div>
                    
                    <div>
                    
                    <div className="container"> 
                    <div className="card">
                        <div class="card-body">
                            <div className="card-top">
                                <span className="card-lable">Person</span>
                            </div>
                            <span className="card-header">{x.name + " " + x.surname}</span>
                            <div className="card-sub-botton">
                            <span className="card-sub-text card-lable">Number: {x.number}</span>
                            <span className="card-sub-text card-lable u-float-right"> Email: {x.email} </span>
                            </div>
                            <div className="card-sub-botton card-sub-show">
                                <button className="button card-sub-text card-link u-float-right">Delete</button>
                                <button onClick = {() => { console.log(x.id);  history.push("/CreatePerson",{id:x.id, edit:true})  }} className="button card-sub-text card-link u-float-right">Edit</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            
                </div>
            ))}


        </div>
    );
}