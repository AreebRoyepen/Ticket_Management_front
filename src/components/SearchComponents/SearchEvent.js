import React,{Component, useState, useEffect} from 'react';
import "../../styles/eventCard.css";
import { useHistory } from "react-router-dom";
import { PopUp } from "../PopUp";

export default function SearchEvent (content) {

  
    // state = {
    //     initialItems: ([]),
    //     items: [],
    //     data:[]

    // };

    const [initialItems, setInitialItems] = useState(content.content);
    const [items, setItems] = useState(content.content);

    let history = useHistory();

    const onSubmit = event => {
      event.preventDefault(event);
    };

    const triggerText = "Open form";

    function filterList  (event){
      let items = initialItems;
     console.log(items.length);
     console.log(event.target.value)
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      setItems(items);
      //this.setState({items: items});
    }

    // useEffect(() =>{

    //   setInitialItems(content.content);
    //   setItems(content.content);


    // });
    
    // componentWillMount = () => {
    //   this.setState({
    //       initialItems: this.props.content,
    //       items: this.props.content
    //   })
    // }

 
      return (
        <div>
          <form>
                <input className ="searchBoxStyle" type="text" placeholder="Search" onChange={ e => filterList(e)}>
                  </input>
          </form>

          <div>
            
            {items.map( x =>(

               

                <div key = {x.id}>
                    
                    <div className="container"> 
                    
                    <div className="card">
                        <div className="card-body" id ={JSON.stringify(x.active)}>
                            <div className="card-header event-name">
                                <p>{x.name}</p>
                            </div>
                            <span className="card-header">Tickets {x.from} - {x.to} |&nbsp;&nbsp;
                            {x.active
                                    ?
                                    <span>Active |&nbsp;&nbsp;</span>
                                    :
                                    <span>Closed |&nbsp;&nbsp;</span>
                                }
                             <span>R {x.ticketPrice} </span>
                            </span>   
                            <div className="card-sub-botton card-sub-show">
                            <input  onClick = {() => { console.log(x.id);  history.push("/EventPage",{event:x, edit:true})}} type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            <input  type="submit" value="DELETE" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                            <PopUp triggerText="delete" onSubmit={onSubmit} />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>
        </div>
      );
    
};