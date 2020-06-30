import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Chart, Doughnut } from 'react-chartjs-2';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Reports from "./modules/admin/Reports"
import { LoadingIcon } from "./modules/shared/LoadingIcon";
import { MdAccountBalance, MdAttachMoney, MdSupervisorAccount } from "react-icons/md";
import { ErrorPage } from "./modules/shared/ErrorPage";
import {getRequest} from "../api/Api"
import "../styles/dashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  card: {
    minWidth: 275,
    textAlign: "center"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 700,
  },
}));



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#08533C',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function Dashboard() {

  const [dData, setData] = useState([])
  const [events, setEvents] = useState([])
  const [error, setError] = useState(false)

  const [connection, setConnection] = useState(false)

  const classes = useStyles();
  var today = new Date();

  let history = useHistory();
  let location = useLocation()

  
  const [user, setUser] = useState(null)

  useEffect( () => {
    setUser(JSON.parse(localStorage.user))  
  },[setUser])

  /**Formart String */

  /**Formart String */

  const data = {
    labels: [
      'Allocated',
      'Unallocated',
      'Paid',
      'Total'

    ],
    datasets: [{
      data: [dData.allocatedTickets, dData.unallocatedTickets, dData.paidTickets, dData.totalTickets],
      backgroundColor: [
        '#2D6409',
        '#C1A162',
        '#08533C',
        '#9c9c9c'
      ],
      hoverBackgroundColor: [
        '#2D6409',
        '#C1A162',
        '#08533C',
        '#9c9c9c'
      ]
    }]
  };




  useEffect(() => {

    async function fetchData() {

      let x = await getRequest("dashboard")

      console.log(x)

      if (x.message === "success") {

        setData(x.data)

        let z = await getRequest("availableEvents")
        if (z.message === "success") {

          console.log(z)

          setEvents(z.event)
          setConnection(true)

        } else if (z.message === "unauthorized") {
          localStorage.clear();
          history.push("/", { last: location.pathname })
        } else if (z.message === "error") {
          console.log("error")
          setError(true)
        } else if (z.message === "no connection") {
          console.log("no connection")
          setError(true)
        }

      } else if (x.message === "unauthorized") {
        localStorage.clear();
        history.push("/", { last: location.pathname })
      } else if (x.message === "error") {
        console.log("error")
        setError(true)
      } else if (x.message === "no connection") {
        console.log("no connection")
        setError(true)
      }




    }

    fetchData()

  }, [history, setData, setEvents])


  Chart.pluginService.register({
    beforeDraw: function (chart) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = 1.3;
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




  const formatCurrency = (x) => {
    var delimeter = " "
    var groupsOf = 3
    var result = (''+x).split('.'), s = '', i, j;
    i = result[0].length;
    while (i > groupsOf) {
        j = i - groupsOf;
        s = delimeter + result[0].slice(j, i) + s;
        i = j;
    }
    s = result[0].slice(0, i) + s;
    result[0] = s;
    return result.join('‧');
  }


  return (
    <div>
      {console.log(dData.funds)}
      {console.log(dData.totalFunds)}
      {console.log(dData.totalTickets)}
      {console.log(dData.allocatedTickets)}
      {console.log(dData.unallocatedTickets)}
      {console.log(dData.paidTickets)}
      {console.log(dData.unpaidTickets)}

      {connection ?


        <div>
          
          <header
            className="dashboardHeader"
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0"
          >
            <h2 className="h2Dashboard"></h2>
            <h1 className="h1Dashboard">Dashboard</h1>
          </header>
          <div id="dashboard-box-shadow">
            <div className={classes.root}>
              <Grid container spacing={2} id="dashboard-box-shadow">

                <Grid item  xs id="dashboard-box-shadow" style={{ backgroundColor: '#ffffff00' }}>
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00', textAlign: 'left' }}>
                    <div class='widget'>
                      <header>
                        <h3>Quick Stats</h3>
                      </header>
                      <div class='chart'>
                      <div className=" chart-wrapper">
                          <Doughnut
                            data={data}
                            options={{
                              cutoutPercentage: 80,
                              responsive: true,
                              style: {
                                width: "600px",
                                height: "300px",


                                display: "inline-block"
                              },
                              legend: {
                                display: false,
                                position: "right"
                              },
                              centerText: {
                                display: true,
                                text: "Tickets"
                              }
                            }}
                          />
                        </div>
                    </div>
                      <div class='info'>
                      <div class="section section-info">
                          <span class="info-time" style={{color:"#C1A162"}}>{today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()}</span>
                          <h3 class="info-title h3-card-special" style={{marginTop:'8px'}}> <MdAccountBalance size={15} color="#08533C"style={{marginRight:'5px'}} />Collected</h3>
                          <div class="info-block" style={{marginTop:'-15px'}}>
                            <dl>
                              <dt>  R {formatCurrency(parseFloat(dData.funds).toFixed(2))} of R {formatCurrency(parseFloat(dData.totalFunds).toFixed(2))}</dt>
                              <dd>from current active events</dd>
                            </dl>
                          </div>
                          <h3 class="info-title h3-card-special" style={{color:'rgb(114, 155, 37)', marginTop:'77px'}}>  <MdAttachMoney size={17} color=" #729B25" style={{marginRight:'5px'}} />Collected</h3>
                          <div class="info-block" style={{marginTop:'-15px', backgroundColor:'rgba(114, 155, 37, 0.274)', color:'rgb(114, 155, 37)'}}>
                            <dl>
                              <dt> R {formatCurrency(parseFloat(dData.fundsThisYear).toFixed(2))}</dt>
                              <dd>Total Funds This Year</dd>
                            </dl>
                          </div>
                          <div class="info-aapl">
                            <div style={{color:'rgb(134, 111, 62)'}}>
                            <h3 class="info-title h3-card-special" style={{ marginTop:'7px'}}> <MdSupervisorAccount size={18} color="#866F3E" style={{marginRight:'5px'}} />People</h3>
                              <h5 style={{marginTop:'-15px', textAlign:"left", fontSize:'1em'}}>{dData.people}</h5>
                            </div>
                          </div>
                          <div class="section"></div>
                        </div>
                      </div>
                    </div>
              
                  </Paper>
                </Grid>
                <Grid item  xs id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                    <TableContainer component={Paper} >
                      <Table className={classes.table} aria-label="customized table" >

                        <TableHead>
                          <TableRow>
                          <StyledTableCell>Active Events </StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {events.splice(0, 5).map(row => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>

                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
               
                {user.role.id == 1 ? (
                <Grid item xs={12} id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                  <TableContainer component={Paper} >

                   <Reports/>
                   </TableContainer>
                  </Paper>
                </Grid>):
                (<div/>)}
              </Grid>
             
            </div>

          </div>


        </div>
        :

        <div>

          {error ?
            <ErrorPage />
            :
            <LoadingIcon />
          }

        </div>
      }



    </div>
  );
}