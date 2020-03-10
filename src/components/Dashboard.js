import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";


export default function Dashboard(){

  const [tickets, setTickets] = useState()
  const [allocated, setAllocated] = useState()
  const [unallocated, setUnallocated] = useState()
  const [paid, setPaid] = useState()
  const [unpaid, setUnpaid] = useState()

  const data = {
    labels: [
      'Allocated',
      'Unallocated'
    ],
    datasets: [{
      data: [allocated,unallocated],
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

  const data2 = {
    labels: [
      'Paid',
      'Allocated'
    ],
    datasets: [{
      data: [paid, allocated],
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

  const data3 = {
    labels: [
      'Paid',
      'Total'
    ],
    datasets: [{
      data: [paid, (allocated+unallocated)],
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

  const data4 = {
    labels: [
      'Allocated',
      'Total'
    ],
    datasets: [{
      data: [allocated, (allocated+unallocated)],
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


  useEffect( () =>{

    Api.postRequest("tickets",{})
    .then(data => data.json())
    .then(data => setAllocated(data.length))//sizeof

    Api.getRequest("unallocated")
    .then(data=> data.json())
    .then(data => setUnallocated(data.message))//message

    Api.postRequest("tickets",{paid:true})
    .then(data => data.json())
    .then(data => setPaid(data.length))//sizeof

    Api.postRequest("tickets",{paid:false})
    .then(data => data.json())
    .then(data => setUnpaid(data.length))//sizeof

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
    <h3></h3>
        
    <div className = " chart-wrapper">       
        <Doughnut data={data4} options={{
          cutoutPercentage: 80,
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
          <h3>Total Allocated</h3>
          <h4>{(allocated / (unallocated+allocated) * 100).toFixed(2)}%</h4>          
        </div> 

        <div className = "chart-wrapper">
              < Doughnut data={data3}options={{
                cutoutPercentage: 80,
                style:{width:"100",
                height: "100",
                float:"left",
                display:"inline-block"},
            legend:{
              display:false,
              position:'right'
            }
          }}/>
          <h3>Total Paid</h3>
          <h4>{(paid / (allocated+unallocated) * 100).toFixed(2)}%</h4>
            </div>

        <div className = " chart-wrapper">       
        <Doughnut data={data} options={{
          cutoutPercentage: 80,
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
          <h3>Total Allocated vs Total Unallocated Tickets</h3>
          <h4>{(allocated / unallocated * 100).toFixed(2)}%</h4>          
        </div> 

            <div className = "chart-wrapper">
              < Doughnut data={data2}options={{
                cutoutPercentage: 80,
                style:{width:"100",
                height: "100",
                float:"left",
                display:"inline-block"},
            legend:{
              display:false,
              position:'right'
            }
          }}/>
          <h3>Total Paid vs Total Allocated Tickets</h3>
          <h4>{(paid / allocated * 100).toFixed(2)}%</h4>
            </div>




        </div>
      </article>
    </section>
  </div>
</main>
        </div>
    );
}