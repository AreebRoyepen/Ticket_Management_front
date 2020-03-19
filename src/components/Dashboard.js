import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Chart, Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";



export default function Dashboard(){

  const [tickets, setTickets] = useState(0)
  const [allocated, setAllocated] = useState(0)
  const [unallocated, setUnallocated] = useState(0)
  const [paid, setPaid] = useState(0)
  const [unpaid, setUnpaid] = useState(0)
  const [connection, setConnection] = useState(false)

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

    async function fetchData(){

      let x = await Api.postRequest("tickets",{})    
      setAllocated(x.ticket.length)//sizeof
      console.log(x.ticket)

      var truestuff = x.ticket.filter( key => {
        if (key.paid == true)
        return key
      })
      console.log(truestuff)
      setPaid(truestuff.length)

      var falsestuff = x.ticket.filter( key => {
        if (key.paid == false)
        return key
      })
      console.log(falsestuff)

      setUnpaid(falsestuff.length)
     
      let y = await Api.getRequest("unallocated")
      setUnallocated(y.ticket)
      setConnection(true)
    }

    fetchData()

  },[setAllocated, setUnallocated])


  Chart.pluginService.register({
    beforeDraw: function(chart) {
      var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;
  
      ctx.restore();
      var fontSize = 1.2;
      ctx.fontColor = "red";
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "center";
  
      var text = chart.options.centerText.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
  
      ctx.fillText(text, textX, textY);
      ctx.save();
    }
  });



    return (
        
      <div>
        {connection         
        
        ?

        <div>
        <main>
          {console.log("Allocated " + allocated)}
          {console.log("Unallocated " + unallocated)}
          {console.log("Paid " + paid)}
<div>
<section>
  <article>
    <header className="dashboardHeader">
      <h2 className="h2Dashboard">Dashboard</h2>
      <h1 className="h1Dashboard">Overview</h1>
    </header>
    <hr/>
    <div>
    <div className = " chart-wrapper">
    <Doughnut data={data4} options={{
      cutoutPercentage: 80,
      responsive: true,
      style:{
         width:"600px",
         height: "300px",

         float:"left",
         display:"inline-block"},
        legend:{
          display:false,
          position:'right'
        },
        centerText: {
          display: true,
          text: "Total Allocated",
          
      }
      }}/>
    </div> 

    <div className = " chart-wrapper">
    <Doughnut data={data3} options={{
      cutoutPercentage: 80,
      responsive: true,
      style:{
         width:"600px",
         height: "300px",

         float:"left",
         display:"inline-block"},
        legend:{
          display:false,
          position:'right'
        },
        centerText: {
          display: true,
          text: "Total Paid"
      }
      }}/>
      
    </div> 

    <div className = " chart-wrapper">
    <Doughnut data={data} options={{
      cutoutPercentage: 80,
      responsive: true,
      style:{
         width:"600px",
         height: "300px",

         float:"left",
         display:"inline-block"},
        legend:{
          display:false,
          position:'right'
        },
        centerText: {
          display: true,
          text: "Allocated vs Unallocated"
      }
      }}/>
    </div> 

    <div className = " chart-wrapper">
    <Doughnut data={data2} options={{
      cutoutPercentage: 80,
      responsive: true,
      style:{
         float:"left",
         display:"inline-block"},
        legend:{
          display:false,
          position:'right'
        },
          centerText: {
          display: true,
          text: "Paid vs Allocated"
      }
      }}/>
    </div> 

    </div>
  </article>
</section>
</div>
</main>
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