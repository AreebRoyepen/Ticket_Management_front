import React from 'react';
import "../styles/eventCard.css";

export default function LoadingIcon (){

    return(

      <div className="container">
      <div className="card">

        <div className="card-body" >
          <div className="card-header event-name">
            <p>Loading ... </p>
          </div>
          <span className="card-header">
          </span>
          <div className="card-sub-botton card-sub-show">
          </div>
        </div>

      </div>
      </div>
    );
  
}