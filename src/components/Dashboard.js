import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { Chart, Doughnut } from 'react-chartjs-2';
import Api from "../api/Api";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LoadingIcon } from "./LoadingIcon";
import { ErrorPage } from "./temp/ErrorPage";

const useStyles = makeStyles({
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
});



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
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
          history.push("/", { last: "/Dashboard" })
        } else if (z.message === "error") {
          console.log("error")
          setError(true)
        } else if (z.message === "no connection") {
          console.log("no connection")
          setError(true)
        }

      } else if (x.message === "unauthorized") {
        localStorage.clear();
        history.push("/", { last: "/Dashboard" })
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
      var fontSize = 0.75;
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
            <h2 className="h2Dashboard">Dashboard</h2>
            <h1 className="h1Dashboard">Overview</h1>
          </header>

          <div>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Collected
                  </Typography>

                <Typography

                  variant="h5"
                  component="h2"
                >
                  R {dData.funds}
                  {bull}00
                  </Typography>

                <Typography
                  className={classes.title}
                  color="textSecondary"

                >
                  of
                  </Typography>

                <Typography
                  className={classes.pos}
                  variant="h5"
                  component="h2"
                >
                  R {dData.totalFunds}
                  {bull}00
                  </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  from all active events
                  </Typography>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className={classes.card} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Collected
                  </Typography>

                <Typography
                  className={classes.pos}
                  variant="h5"
                  component="h2"
                >
                  R {dData.fundsThisYear}
                  {bull}00
                  </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  This year
                  </Typography>
              </CardContent>
            </Card>
          </div>

          <div>
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
                    text: "Totals"
                  }
                }}
              />
            </div>
          </div>

          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">

                <TableHead>
                  <TableRow>
                    <StyledTableCell>Active Events</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {events.splice(0, 3).map(row => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
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