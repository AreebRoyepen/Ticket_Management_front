import React,{Component, useState} from 'react';
import "../styles/eventCard.css";


export default class Searchbar extends Component {

  
    state = {
        initialItems: ([]),
        items: [],
        data:[]

    };
    
    filterList = (event) => {
      let items = this.state.initialItems;
     console.log(items.length);
      items = items.filter((item) => {
        return JSON.stringify(item).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({
          initialItems: this.props.content,
          items: this.props.content
      })
    }

    render() {
      return (
        <div>
          <form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
          </form>

          <div>
            {this.state.items.reverse().map( x =>(


                <div key = {x.id}>
                    
                    <div className="container"> 
                    <div className="card">
                        <div className="card-body">
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
                            <input  type="submit" value="EDIT" name="button"className="cardButtons  card-link u-float-right"/>
                            <input  type="submit" value="DELETE" name="button"className="cardButtons  card-link u-float-right"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            ))}</div>
        </div>
      );
    }
};