import React, { useState, useEffect }  from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReportEndpoints from "./ReportEndpoints";
import "../../../styles/validationForm.css";
import "../../../styles/login.css";

export default function Reports() {

    const [selectedOption, setSelectedOption] = useState("All");

    const [user, setUser] = useState(null)

    useEffect( () => {
      setUser(JSON.parse(localStorage.user))  
    },[setUser])

    const [params, setParams] = useState({
      param1 : null,
      param2 : null,
      endpoint: null,
      send : null,
      email:null
    });

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
    };

      const tempfunction = (x, y) =>{

        console.log(x + " " + y)

          setParams({
            param1 : selectedOption,
            param2 : x,
            endpoint: y,
            send : true,
            email:user.email
          })

      } 

      const toEndpoints = () => {
        return <ReportEndpoints props = {params}  />
      }

    return(
        
      <div>
        {console.log(selectedOption)}
        {console.log(params)}

        {params.send ?          
          toEndpoints()
        :
        <div/>
        }

        <div className="makeRow">

          <h1 className="h1Dashboard" >Radio Button Description: </h1>
          <RadioGroup row  className="makeRow" value={selectedOption} onChange={handleChange}>
            <FormControlLabel value="All"
              control={<Radio
                color="default"
                inputProps={{ 'aria-label': 'D' }}
              />}
              label="All"
              labelPlacement="top"
            />
            <FormControlLabel value="Open"
              control={<Radio
                color="default"
                inputProps={{ 'aria-label': 'D' }}
              />}
              label="Open"
              labelPlacement="top"
            />
            <FormControlLabel value="Closed"
              control={<Radio
                color="default"
                inputProps={{ 'aria-label': 'D' }}
              />}
              label="Closed"
              labelPlacement="top"
            />
          </RadioGroup>
        </div>

        <div className="makeRow" >
              <p>Events Outstanding Totals :</p>
        <button
              className="headerButtons"
              onClick = {() => tempfunction("download","eventsOutstanding")}>
               Download PDF
          </button>
          <button
              className=" headerButtons"
              onClick = {() => tempfunction("email","eventsOutstanding")}>
               Send as email
          </button>
        </div>

        <div className="makeRow">
          <p>People Outstanding Totals :</p>
            <button
              className="headerButtons"
              onClick = {() => tempfunction("download","whoOwesWhat")}>
              Download PDF
          </button>
          <button
              className="headerButtons"
              onClick = {() => tempfunction("email","whoOwesWhat")}>
               Send as email
          </button>
          
        </div>

        <div className="makeRow">
          <p>&nbsp;&nbsp;&nbsp;Returned Tickets Totals :</p>
            <button
              className="headerButtons"
              onClick = {() => tempfunction("download", "returnedTickets")}>
              Download PDF
          </button>
          <button
              className="headerButtons"
              onClick = {() => tempfunction("email","returnedTickets")}>
               Send as email
          </button>
        </div>
      </div>

    );
}