import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";



const data = {
	labels: [
		'Paid',
		'Unpaid'
	],
	datasets: [{
		data: [300,100],
		backgroundColor: [
		'#99cc33',
		'#9c9c9c'
		],
		hoverBackgroundColor: [
		'#99cc33',
		'#9c9c9c',
		]
	}]
};

export default function Dashboard(){

  const [tickets, setTickets] = useState()
  const [allocated, setAllocated] = useState()
  const [unallocated, setUnallocated] = useState()

  useEffect( () =>{

    Api.postRequest("tickets",{})
    .then(data => data.json())
    .then(data => setAllocated(data))//sizeof

    Api.getRequest("unallocated")
    .then(data=> data.json())
    .then(data => setUnallocated(data))//message

  },[setAllocated, setUnallocated])

    return (
        
        <div>
          {console.log(allocated)}
          {console.log(unallocated)}
            <main>
  <div>
    <section>
      <article>
        <header>
          <h2>Dashboard</h2>
          <h1>Overview</h1>
        </header>
        <hr/>
        <div>
        <h3>Tickets</h3>
        
        <div className = " chart-wrapper">
        <Doughnut data={data} options={{
          style:{
             width:"100",
             height: "100",
             float:"left",
             display:"inline-block"},
            legend:{
              display:false,
              position:'right'
            }
          }}/>
          <h2>blah</h2>
          <h1>yeet</h1>
          
        </div> 
            <div className = "chart-wrapper">
              < Doughnut data={data}options={{
                style:{width:"100",
                height: "100",
                float:"left",
                display:"inline-block"},
            legend:{
              display:true,
              position:'right'
            }
          }}/>
            </div>
        </div>
      </article>
    </section>
  </div>
</main>
        </div>
    );
}