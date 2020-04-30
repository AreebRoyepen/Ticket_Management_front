import React,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import Loading from '../shared/LazyLoadingIcon';
import DeletePopOver from "../shared/DeletePopOver";
import "../../../styles/eventCard.css";
import "../../../styles/popUp.css";

export default function SearchPeople (content) {

  const [initialItems, ] = useState(content.content);
  const [items, setItems] = useState(content.content);
  let history = useHistory();

  const [user, setUser] = useState(null)

  useEffect( () => {
    setUser(JSON.parse(localStorage.user))  
  },[setUser])

  function filterList  (event){
    let items = initialItems;
    items = items.filter((item) => {
      return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setItems(items);
  }

  const deleteButton = (x) =>{

    if(user.role.id == 1)
      return <DeletePopOver style={{float:'right !important'}} content={x} type = "Person" className=" card-link u-float-right"/>
  
  }
  

  return (
    <div>
            
    <input className ="searchBoxStyle" type="search" placeholder="SEARCH" onChange={ e => filterList(e)}/>
    <div>
        
      {items.map( x =>(

        <LazyLoad key = {x.id} placeholder = {<Loading />}>
        <div key = {x.id}>                              
          <div className="container"> 
          <div className="card">
              <div className="card-body" id ={JSON.stringify(x.active)}>
                <div className="card-header event-name">
                    <p>{x.name + " " + x.surname}</p>
                </div>
                <span className="card-header">{x.number}<span className="card-header u-float-right"> {x.email} </span>
                </span>                 

                  <div className="card-sub-botton card-sub-show">
                    <input  onClick = {() => { console.log(x.id);  history.push("/PersonPage",{x:x, edit:true})}} 
                    type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                    
                    {user ?                    
                    deleteButton(x)
                    :
                    <div/>
                    }                  
                  
                  </div>
              </div>
          </div>
          </div>
          </div>

        </LazyLoad>
          
      ))}
  </div>
  </div>
  );
    
};