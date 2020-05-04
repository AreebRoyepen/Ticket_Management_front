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
import Api from "../api/Api"
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
  const bull = <span className={classes.bullet}>•</span>;

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

      let x = await Api.getRequest("dashboard")

      console.log(x)

      if (x.message === "success") {

        setData(x.data)

        let z = await Api.getRequest("availableEvents")
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
          <meta
            name="viewport"
            content="width=device-width, user-scalable=no"
          />

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
                <Grid item xs id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                    <Card className={classes.card} style={{ boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)' }} variant="outlined">
                      <CardContent style={{ borderLeft: 'solid 15px #C1A162' }}>
                        <MdAccountBalance size={60} color="#08533C" style={{ marginLeft: '70%' }} />
                        <Typography
                          className={classes.title}
                          style={{ marginTop: '-67px', marginRight: '90%', color: '#2D6409', fontSize: "2em" }}
                          color="textSecondary"
                        >
                          Collected
                        </Typography>

                        <Typography
                         
                          className={classes.title}
                          style={{ textAlign:'left',color: '#C1A162', fontSize: "1.2em" }}
                          color="textSecondary"

                        >
                          R {formatCurrency(parseFloat(dData.funds).toFixed(2))}
                        </Typography>
                        <Typography
                          className={classes.title}
                          style={{ textAlign:'left',color: '#C1A162', fontSize: "1.2em" }}
                          color="#729B25"

                        >
                        of
                         </Typography>
                        <Typography
                         
                         className={classes.title}
                         style={{textAlign:'left',color: '#C1A162', fontSize: "1.2em" }}
                         color="textSecondary"

                       >
                        R {formatCurrency(parseFloat(dData.totalFunds).toFixed(2))}
                       </Typography>
                        <Typography className={classes.pos} color="textSecondary" style={{ marginLeft: '70%', marginTop: '-45px', color: '#C1A162', fontSize: "0.9em" }}>
                          from current  active  events
                        </Typography>
                      </CardContent>
                    </Card></Paper>
                </Grid>
                <Grid item xs id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }} >
                    <Card className={classes.card} style={{ boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)' }} variant="outlined">
                      <CardContent style={{ borderLeft: 'solid 15px #729B25' }}>
                        <MdAttachMoney size={60} color=" #729B25" style={{ marginLeft: '70%' }} />
                        <Typography
                          className={classes.title}
                          style={{ marginTop: '-67px', marginRight: '90%', color: '#2D6409', fontSize: "2em" }}
                          color="textSecondary"
                        >
                          Collected
                        </Typography>

                        <Typography
                          style={{textAlign:'left',color: '#C1A162', fontSize: "1.2em" }}
                          variant="h5"
                          component="h2"

                        >
                          R {formatCurrency(parseFloat(dData.fundsThisYear).toFixed(2))}

                        </Typography>
      
                        <Typography className={classes.pos} color="textSecondary" style={{ marginLeft: '70%', marginTop: '5px', color: '#C1A162', fontSize: "0.9em" }}>
                         total funds for this year
                        </Typography>
                        
                      </CardContent>
                    </Card></Paper>
                </Grid>
                <Grid item xs id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                    <Card className={classes.card} style={{ boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)' }} variant="outlined">
                      <CardContent style={{ borderLeft: 'solid 15px #866F3E' }}>
                        <MdSupervisorAccount size={60} color="#866F3E" style={{ marginLeft: '70%' }} />
                        <Typography
                          className={classes.title}
                          style={{ marginTop: '-67px', marginRight: '90%', color: '#2D6409', fontSize: "2em" }}
                          color="textSecondary"
                        >
                          People
                        </Typography>

                        <Typography
                         style={{textAlign:'left',color: '#C1A162', fontSize: "1.2em" }}
                          variant="h5"
                          component="h2"

                        >
                          {dData.people}
                         </Typography>
                        <Typography className={classes.pos} color="textSecondary" style={{ marginLeft: '70%', marginTop: '5px', color: '#C1A162', fontSize: "0.9em" }}>
                          number of fundraisers
                        </Typography>
                      </CardContent>
                    </Card></Paper>
                </Grid>


              </Grid>

            </div>

          </div>


          <div id="dashboard-box-shadow">
            <div className={classes.root}>
              <Grid container spacing={2} id="dashboard-box-shadow">

                <Grid item  xs={12} sm={6} id="dashboard-box-shadow" style={{ backgroundColor: '#ffffff00' }}>
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                    <Card className={classes.card} style={{ boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)' }} variant="outlined">
                      <CardContent>
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
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
                <Grid item  xs={12} sm={6} id="dashboard-box-shadow">
                  <Paper className={classes.paper} style={{ backgroundColor: '#ffffff00' }}>
                    <TableContainer component={Paper} >
                      <Table className={classes.table} aria-label="customized table" >

                        <TableHead>
                          <TableRow>
                          <StyledTableCell>Active Events </StyledTableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {events.splice(0, 6).map(row => (
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
                <Grid item xs id="dashboard-box-shadow">
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