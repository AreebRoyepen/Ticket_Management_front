import React, { useState, useEffect }  from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ReportEndpoints from "./ReportEndpoints";
import { MdFileDownload,MdEmail} from "react-icons/md";
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

      const getOptions = (x, y) =>{

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

          <h1 className="h1Dashboard" >Select Events To Report On:</h1>
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

        <div id="demo makeRow">
          <table id="table" class="table table-hover table-mc-light-blue makeRow">
            <thead>
              <tr>
                <th style={{textAlign:'center', backgroundColor:'#08533C',color:'white', width:'33.33%'}}>Genarated PDF</th>
                <th style={{textAlign:'center', backgroundColor:'#C1A162',color:'white',width:'33.33%'}}>Download PDF</th>
                <th style={{textAlign:'center', backgroundColor:'rgb(114, 155, 37)',color:'white',width:'33.33%'}}>Email PDF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign:'center'}} data-title="Name">Events Outstanding Totals </td>
                <td data-title="Link" style={{textAlign:'center'}} >
                  <button style={{textAlign:'center'}}
                    className="reportsButton makeRow"
                    onClick={() => getOptions("download", "eventsOutstanding")}><MdFileDownload size={20} />
                </button>

                </td>
                <td data-title="Status" style={{textAlign:'center'}}> <button
                  className=" reportsButton makeRow"
                  style={{color:'rgb(114, 155, 37)', borderColor:'rgb(114, 155, 37) !important'}}
                  onClick={() => getOptions("email", "eventsOutstanding")}>
                  <MdEmail size={20}/>
          </button></td>
              </tr>
              <tr>
                <td data-title="Name" style={{textAlign:'center'}}>People Outstanding Totals</td>
                <td data-title="Link" style={{textAlign:'center'}}>
                  <button
                    className="reportsButton"
                    onClick={() => getOptions("download", "whoOwesWhat")}>
                   <MdFileDownload size={20} />
          </button>
                </td>
                <td data-title="Status" style={{textAlign:'center'}}> <button
                  className="reportsButton"
                  style={{color:'rgb(114, 155, 37)', borderColor:'rgb(114, 155, 37) !important'}}
                  onClick={() => getOptions("email", "whoOwesWhat")}>
                  <MdEmail size={20} />
          </button></td>
              </tr>
              <tr>
                <td data-title="Name" style={{textAlign:'center'}}>Returned Tickets Totals</td>
                <td data-title="Link" style={{textAlign:'center'}}>
                  <button
                    className="reportsButton"
                    onClick={() => getOptions("download", "returnedTickets")}>
                   <MdFileDownload size={20} />
          </button>

                </td>
                <td data-title="Status" style={{textAlign:'center'}}> <button
                  className="reportsButton"
                  style={{color:'rgb(114, 155, 37)', borderColor:'rgb(114, 155, 37) !important'}}
                  onClick={() => getOptions("email", "returnedTickets")}>
                  <MdEmail size={20} />
          </button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      
    );
}