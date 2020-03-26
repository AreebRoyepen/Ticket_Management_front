import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Chart, Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";
import { useHistory } from "react-router-dom";



export default function Dashboard(){

  const [allocated, setAllocated] = useState(0)
  const [unallocated, setUnallocated] = useState(0)
  const [paid, setPaid] = useState(0)
  const [unpaid, setUnpaid] = useState(0)
  const [connection, setConnection] = useState(false)

  let history = useHistory();

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

      console.log(x)

      if(x.message === "success"){
        setAllocated(x.ticket.length)//sizeof

        var truestuff = x.ticket.filter( key => {
          if (key.paid === true)
          return key
        })
        setPaid(truestuff.length)

        var falsestuff = x.ticket.filter( key => {
          if (key.paid === false)
          return key
        })
        setUnpaid(falsestuff.length)
     
      }else if (x.message === "no connection"){

        console.log("check your internet connection")

      } else if(x.message === "unauthorized"){

        localStorage.clear();
        history.push("/", {last : "/Dashboard"})

      }
      
      let y = await Api.getRequest("unallocated")

      if(y.message === "success"){

        console.log(y)
        setUnallocated(y.ticket)

      }else if (y.message === "unauthorized"){
        localStorage.clear();
        history.push("/", {last : "/Dashboard"})
    }else if(y.message === "error"){
      console.log("error")
    }else if(y.message === "no connection"){
      console.log("no connection")
    }


      setConnection(true)
    }

    fetchData()

  },[setAllocated, setUnallocated, history, setUnpaid])


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