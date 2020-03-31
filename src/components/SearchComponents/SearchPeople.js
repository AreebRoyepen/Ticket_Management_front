import React,{ useState } from 'react';
import useModal from 'react-hooks-use-modal';
import LazyLoad from 'react-lazyload';
import Loading from '../LoadingIcon';
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
                        <input  onClick = {() => { console.log(x.id);  history.push("/PersonPage",{x:x, edit:true})}} type="submit" value="Edit" name="button"className="cardButtons  card-link u-float-right" id={JSON.stringify(x.active)}/>
                        <input  type="submit" value="Delete" name="button"className="cardButtons card-link u-float-right" id={JSON.stringify(x.active)}/>
                        </div>
                    </div>
                </div>
                </div>
                </div>

              </LazyLoad>

               
            ))}</div>
        </div>
      );
    
};