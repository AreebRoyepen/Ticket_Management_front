import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";
import { useHistory } from "react-router-dom";



export default function Dashboard(){

  const [tickets, setTickets] = useState(0)
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
          if (key.paid == true)
          return key
        })
        setPaid(truestuff.length)

        var falsestuff = x.ticket.filter( key => {
          if (key.paid == false)
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

  },[setAllocated, setUnallocated])

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
      <h3 className="h3Style">Total Allocated</h3>
      <h4 className="h4Style">{(allocated / (unallocated+ allocated) * 100).toFixed(2)}%</h4>
    </div> 


    <div className = " chart-wrapper">
    <Doughnut data={data3} options={{
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
      <h3 className="h3Style">Total Paid</h3>
      <h4 className="h4Style">{(paid / (unallocated+ allocated) * 100).toFixed(2)}%</h4>
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
      <h3 className="h3Style">Allocated vs Unallocated</h3>
      <h4 className="h4Style">{(allocated / unallocated * 100).toFixed(2)}%</h4>
    </div> 

    <div className = " chart-wrapper">
    <Doughnut data={data2} options={{
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
      <h3 className="h3Style">Paid vs Allocated</h3>
      <h4 className="h4Style">{(paid / allocated * 100).toFixed(2)}%</h4>
    </div> 

    </div>
  </article>
</section>
</div>
</main>
    </div>



        :


      <h1>Loading </h1>

      
        }
      </div>
    );
}