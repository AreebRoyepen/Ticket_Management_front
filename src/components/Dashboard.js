import React, { useState, useEffect } from "react";
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
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
        <div>
          <div>
            <div>
              <div>
                <h4 >Tickets</h4>
              </div>
              <metric-list-item v-for="(country, index) in countryData">
              </metric-list-item>
            </div>
            <a href="#" class="no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white">All Countries</a>
          </div>
          <div class="w-100 w-50-l ph3 mb3 mb0-l">
            <div class="bt bl br b--black-10 br2">
              <div class="pa3 bb b--black-10">
                <h4 class="mv0">Most Visited Pages</h4>
              </div>
              <metric-list-item v-for="(page, index) in pageData">
              </metric-list-item>
            </div>
            <a href="#" class="no-underline fw5 mt3 br2 ph3 pv2 dib ba b--blue blue bg-white hover-bg-blue hover-white">All Pages</a>
          </div>
        </div>
      </article>
    </section>
  </div>
</main>
        </div>
    );
}