import React,{ useState, useEffect} from 'react';
import "../../styles/eventCard.css";
import { useHistory } from "react-router-dom";
import LazyLoad from 'react-lazyload';
import Loading from '../LazyLoadingIcon';

export default function SearchEvent (content) {
  
    const [initialItems] = useState(content.content);
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
      console.log(items)
      setItems(items);
    }

    const allButtons = (x) =>{

        return (
          <div>
            <input
              onClick={() => {
                history.push("/TicketAllocation", { event: x });
              }}
              type="submit"
              value="Allocate"
              name="button"
              className="cardButtons  card-link u-float-right"
              id={JSON.stringify(x.active)}
            />

            <input
              onClick={() => {
                history.push("/ReturnTickets", { event: x });
              }}
              type="submit"
              value="Return"
              name="button"
              className="cardButtons  card-link u-float-right"
              id={JSON.stringify(x.active)}
            />

            <input
              onClick={() => {
                history.push("/Payments", { event: x });
              }}
              type="submit"
              value="Pay"
              name="button"
              className="cardButtons  card-link u-float-right"
              id={JSON.stringify(x.active)}
            />

            {user.role.id == 1 ? (
              <div>
                <input
                  type="submit"
                  value="Delete"
                  name="button"
                  className="cardButtons  card-link u-float-right"
                  id={JSON.stringify(x.active)}
                />

                <input
                  onClick={() => {
                    console.log(x.id);
                    history.push("/EventPage", { event: x, edit: true });
                  }}
                  type="submit"
                  value="Edit"
                  name="button"
                  className="cardButtons  card-link u-float-right"
                  id={JSON.stringify(x.active)}
                />

                <input

                  type="submit"
                  value={x.active ?"Close" : "Open"}
                  name="button"
                  className="cardButtons  card-link u-float-right"
                  id={JSON.stringify(x.active)}
                />

              </div>
            ) : (
              <div />
            )}
          </div>
        );
      
  }

 
      return (
        <div>
          <input
            className="searchBoxStyle"
            type="search"
            placeholder="SEARCH"
            onChange={e => filterList(e)}
          />
          <div>
            {items.map(x => (
              <LazyLoad key={x.id} placeholder={<Loading />}>
                <div key={x.id}>
                  <div className="container">
                    <div className="card">
                      <div className="card-body" id={JSON.stringify(x.active)}>
                        <div className="card-header event-name">
                          <p>{x.name}</p>
                        </div>
                        <span className="card-header">
                          Tickets {x.from} - {x.to} |&nbsp;&nbsp;
                          {x.active ? (
                            <span>Active |&nbsp;&nbsp;</span>
                          ) : (
                            <span>Closed |&nbsp;&nbsp;</span>
                          )}
                          <span>R {x.ticketPrice} </span>
                        </span>
                        <div className="card-sub-botton card-sub-show">
                          <input
                            type="submit"
                            value="Delete"
                            name="button"
                            className="cardButtons  card-link u-float-right"
                            id={JSON.stringify(x.active)}
                          />

                          {user ? (
                            <div class="dropdown u-float-right">
                              <button class="dropbtn">actions</button>
                              <div class="dropdown-content">
                              {allButtons(x)}
                              </div>
                            </div>
                          ) : (
                            <div />
                          )}
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