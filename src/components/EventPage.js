import React, { useState, useRef, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../api/Api";
import "../styles/login.css";
import "../styles/validationForm.css";

export default function EventPage() {
   
    let history = useHistory();
    let location = useLocation();

    console.log(location)
    
    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {      

      if(location.state.edit){
        setName(location.state.event.name)
        setTo(location.state.event.to)
        setFrom(location.state.event.from)
        setPrice(location.state.event.ticketPrice)
      }
    }, [location])

    const sendRequest = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)

      // send the actual request

      var x = {
        "name": name,
        "to": parseInt(to),
        "from": parseInt(from),
        "ticketPrice": parseInt(price),
      };

      async function fetchData(){
        if(location.state.edit){

          let resp = await Api.putRequest("updateEvent/"+location.state.event.id, x)
          if(resp.message === "success"){
            console.log("success")
            history.goBack()
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/" , {last : "/EventPage", data : location.state})
        }else if(resp.message === "error"){
          console.log("error")
        }else if(resp.message === "no connection"){
          console.log("no connection")
        }
          
        }else{
          let resp = await Api.postRequest("addEvent",x)
          if(resp.message === "success"){
            console.log("success")
            history.goBack()
          }else if (resp.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/EventPage"})
        }else if(resp.message === "error"){
          console.log("error")
        }else if(resp.message === "no connection"){
          console.log("no connection")
        }
        }
      }
      fetchData()


      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending, to, from,price, name, location, history]); // update the callback if the state changes

    const back = () =>{

      history.push("/Events");


    }
  
    const validateForm=() =>
    {
      var a = {
        "name": name,
        "to": parseInt(to),
        "from": parseInt(from),
        "ticketPrice": parseInt(price)
      };

      console.log(a);
      if(!(/(null|undefined|^$|^\d+$)/).test(a.name) & (/(null|undefined|^$|^\d+$)/).test(a.from) 
      & (/(null|undefined|^$|^\d+$)/).test(a.to) & (/(null|undefined|^$|^\d+$)/).test(a.ticketPrice))
       {  console.log(a.price+" price output is weird")
          return "trueValid";}
      
      return "falseValid";
    }


    return (

      <body class="bodyVal htmlVal spanVal">
      <form class="form ">
          <div>
          <label for="text" class="form__label">Event Name</label>
          <input required type="text" class="form__input inputValText" name="text" placeholder="Event Name" value = {name}
              onChange={ e => setName(e.target.value)} />
          <div class="form__requirements">
            Event Name is required
          </div>
          </div>

          <div>
          <label for="number" class="form__label">Ticket Start Number</label>
          <input required type="number" class="form__input inputValText" name="text" placeholder="2001"  value = {from}
             onChange={ e => setFrom(e.target.value)}/>
          <div class="form__requirements">
            Please enter in a valid ticket number
          </div>
          </div>

        <div>
          <label for="number" class="form__label">Ticket end number</label>
          <input required type="number" class="form__input inputValText" name="text" placeholder="2005"  value = {to}
             onChange={ e => setTo(e.target.value)}/>
          <div class="form__requirements">
            Please enter in a valid ticket number
          </div>
          </div>

           <div>
          <label for="number" class="form__label">Ticket Price (R)</label>
          <input required type="number" class="form__input inputValEmail" name="text" placeholder="100"  value = {price}
              onChange={ e => setPrice(e.target.value)} />
          <div class="form__requirements">
            Please enter a valid ticket price
          </div>
          </div>
             <div id = {validateForm()}>
              
          {location.state.edit ? 
      
               <button className = "button falseValid" type="button" disabled={isSending} onClick={sendRequest} > Edit Event</button>
                  :
    
               <button className = " falseValid button" type="button" disabled={isSending} onClick={sendRequest}> Create Event</button>
             }
             </div>
        <button className = "button" type="button" onClick={back}> Cancel</button>
      </form>
      </body>
    );
}
