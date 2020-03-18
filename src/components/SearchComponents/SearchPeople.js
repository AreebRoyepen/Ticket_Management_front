import React,{Component, useState, useEffect} from 'react';
import "../../styles/eventCard.css";
import { useHistory } from "react-router-dom";

export default function SearchPeople (content) {


    const [initialItems, setInitialItems] = useState(content.content);
    const [items, setItems] = useState(content.content);

    let history = useHistory();

    function filterList  (event){
      let items = initialItems;
     console.log(items.length);
     console.log(event.target.value)
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      setItems(items);
    }

      return (
        <div>
          <form>
                <input type="text" placeholder="Search" onChange={ e => filterList(e)}/>
          </form>

          <div>
            
            {items.reverse().map( x =>(

               

                <div key = {x.id}>
                    
                    <div className="container"> 
                    
                    <div className="card">
                        <div className="card-body" id ="true">
                        <div className="card-top">
                                <span className="card-lable">Person</span>
                            </div>
                            <span className="card-header">{x.name + " " + x.surname}</span>
                            <div className="card-sub-botton">
                            <span className="card-sub-text card-lable">Number: {x.number}</span>
                            <span className="card-sub-text card-lable u-float-right"> Email: {x.email} </span>
                            </div>
                            <div className="card-sub-botton card-sub-show">
                            <input  onClick = {() => { console.log(x.id);  history.push("/PersonPage",{x:x, edit:true})}} type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            <input  type="submit" value="Delete" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>
        </div>
      );
    
};