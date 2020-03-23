import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Api from "../api/Api";
import "../styles/login.css";
import "../styles/validationForm.css";
import { wait } from "@testing-library/react";

export default function PersonPage() {

    let history = useHistory();
    let location = useLocation();

    console.log(location)
    
    const [isSending, setIsSending] = useState(false);
    const isMounted = useRef(true)

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const[isValid, setValid] = useState(false);
    
    useEffect(() => {      

      if(location.state.edit){
        setName(location.state.x.name)
        setSurname(location.state.x.surname)
        setEmail(location.state.x.email)
        setNumber(location.state.x.number)
      }
      
      

     },[setName,location]);

 

    const sendRequest = useCallback(async () => {
      // don't send again while we are sending
      if (isSending) return

      // update state
      setIsSending(true)
      // send the actual request

      var x = {
        "name": name,
        "surname": surname,
        "number": number,
        "email": email        
      };

      async function fetchData(){

        if(location.state.edit){


          let resp = await Api.putRequest("updatePerson/"+location.state.x.id,x)
          if(resp.message === "success"){
            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/PersonPage"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }
          
  
  
        }else{
          
          let resp =await Api.postRequest("addPerson",x)
          console.log(resp)
          if(resp.message === "success"){
            history.goBack()
          }else if (x.message === "unauthorized"){
            localStorage.clear();
            history.push("/", {last : "/PersonPage"})
          }else if(x.message === "error"){
            console.log("error")
          }else if(x.message === "no connection"){
            console.log("no connection")
          }
        
        
        }

      }

      fetchData()



      // once the request is sent, update state again
      if (isMounted.current) // only update if we are still mounted
        setIsSending(false)

    }, [isSending,name, surname,number, email, location, history]); // update the callback if the state changes

    
    const validateForm=() =>
    {
      var x = {
        "name": name,
        "surname": surname,
        "number": number,
        "email": email        
      };
      var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      console.log("yeet"+ x.name)
      if((/^\D*$/.test(x.name)) && (/^\D*$/.test(x.surname)) && (/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(x.number))
       && emailRegex.test(x.email) && !(/(null|undefined|^$|^\d+$)/).test(x.name) && !(/(null|undefined|^$|^\d+$)/).test(x.surname))
        return true;
      return false;
    }
    
    
    const back = () =>{

      history.goBack();

    }

    return (
     
        <body class="bodyVal htmlVal spanVal">
<form class="form ">
    <div>
		<label for="text" class="form__label">First Name</label>
		<input required type="text" class="form__input inputValText" name="text" placeholder="John" pattern="^\D*$"  value = {name}
        onChange={ e => setName(e.target.value)} />
		<div class="form__requirements">
      First name is required
    </div>
    </div>

    <div>
		<label for="text" class="form__label ">Last Name</label>
		<input required type="text" class="form__input inputValText" name="text" placeholder="Doe" pattern="^\D*$"  value = {surname}
        onChange={ e => setSurname(e.target.value)} />
		<div class="form__requirements">
      Last name is required
    </div>
    </div>

    <div>
		<label for="text" class="form__label">Contact Number</label>
		<input required type="text" class="form__input inputValText" name="text" placeholder="0841235678" pattern="^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$" value = {number}
        onChange={ e => setNumber(e.target.value)} />
		<div class="form__requirements">
      Please enter in a valid contact number
    </div>
    </div>

     <div>
		<label for="email" class="form__label">Email</label>
		<input required type="email" class="form__input inputValEmail" name="email" placeholder="example@aol.com"  value = {email}
        onChange={ e => setEmail(e.target.value)} />
		<div class="form__requirements">
      Please enter a valid email address
    </div>
    </div>
       <div id = {JSON.stringify(validateForm())}>
   
       {location.state.edit ? 
            
            
            <button className = "button" type="button" disabled={isSending} onClick={sendRequest} > Edit Person</button>
          :
          
          <button className = "button" type="submit" disabled={isSending} onClick={sendRequest }  id={validateForm} checkFormValidation ="true"> Add Person</button>
          }
       </div>
      
 


  <button className = "button" type="button" onClick={back}> Cancel</button>
</form>
</body>

    );
}
