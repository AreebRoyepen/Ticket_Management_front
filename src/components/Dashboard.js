import React from "react";
import "../styles/dashboard.css";
import { Doughnut } from 'react-chartjs-2';



const data = {
	labels: [
		'Paid',
		'Unpaid'
	],
	datasets: [{
		data: [300,100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		]
	}]
};

export default function Dashboard(){

    return (
        
        <div>
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
        <Doughnut data={data} options={{
          width:"100",
          height: "100",
            legend:{
              display:true,
              position:'right'
            }
          }}/>
      
          <div>
            <div>
              < Doughnut data={data}options={{
          width:"100",
          height: "100",
            legend:{
              display:true,
              position:'right'
            }
          }}></ Doughnut>
            </div>
            <h3>Tickets</h3>
            <h4>Paid vs Unpaid</h4>
          </div>
        </div>
      </article>
    </section>
  </div>
</main>
        </div>
    );
}