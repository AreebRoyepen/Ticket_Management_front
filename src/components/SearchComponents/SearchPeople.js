import React,{Component, useState, useEffect} from 'react';
import useModal from 'react-hooks-use-modal';
import "../../styles/eventCard.css";
import "../../styles/popUp.css";

import { useHistory } from "react-router-dom";

export default function SearchPeople (content) {


    const [initialItems, ] = useState(content.content);
    const [items, setItems] = useState(content.content);

    let history = useHistory();

    function filterList  (event){
      let items = initialItems;
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      console.log(items)
      setItems(items);
    }

    
const modalStyle = {
  backgroundColor: 'white',
  padding: '40px 45px',
  marginLeft:"30px",
  marginRight:"40px",
  borderRadius: '10px',
  marginTop:"140px",
};


const maskStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
 
  bottom: 0,
  right: 0,
  backgroundColor: 'gray',
  zIndex: 100000
};


    const [Modal, open, close, isOpen] = useModal('root', {
      preventScroll: true,
      backgroundColor: '#fff',
      domNode:'cat'
    });
    

      return (
        <div>
                <input className ="searchBoxStyle" type="text" placeholder="Search" onChange={ e => filterList(e)}/>
          <div>
            
            {items.map( x =>(
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
                           <cat>
                           <button className = "cardButtons  card-link u-float-right"onClick={open}>Delete</button>
                             <Modal style={maskStyle}>
                               <div style={maskStyle}>
                                 <div style={modalStyle}>
                                 <h1>Delete</h1>
                                 <span className="card-header">{x.id}</span>
                                     <p>You are about to delete this person from your database. Click the delete button to confirm</p>
                                     <input  type="submit" value="Delete" name="button"className="cardButtons" id={JSON.stringify(x.active)}/>
                               <button className="cardButtons" onClick={close}>cancel</button>
                                 </div>
                                   
                              </div>
                             </Modal> 
                             </cat>  
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>
        </div>
      );
    
};