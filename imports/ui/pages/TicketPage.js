import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {TicketApi} from '../../api/ticket';

class TicketPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      price:'',
      description:'',
      description:'',
      ticket:[],
    } ;
  }

  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
  }

  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }


  handleTicket(event){
    event.preventDefault();

    let name = this.state.name.trim();
    let price = this.state.price.trim();
    let description = this.state.description.trim();
    if (name === '') {
      this.showSnackBar("Enter Name of ticket")
      return false;
    }
    if (price === '') {
      this.showSnackBar("Enter price of ticket")
      return false;
    }
    if (description === '') {
      this.showSnackBar("Enter description of ticket")
      return false;
    }
    let ticket = {
      name,price,description
    }
    Meteor.call('ticket.insert',ticket,(err,res)=>{
      if (res) {
        this.setState({name:'',price:'',description:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })


  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allticket");
    let ticket = TicketApi.find({}).fetch();
    this.setState({ticket});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteTicket(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('ticket.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Tickets</h4>

      <form onSubmit={this.handleTicket.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Ticket Name</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'price')} value={this.state.price}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Ticket Price</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'description')} value={this.state.description}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Ticket Description</label>
        </div>

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.ticket.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.ticket.map((tick,i)=>{
            return(
              <li className="mdl-list__item" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{tick.name[0].toUpperCase()}</i>
                <div style={{cursor:'pointer'}}>{tick.name}</div>
                <span className="mdl-list__item-sub-title" style={{marginRght:10,marginLeft:10}}>   ₹.{tick.price}</span>
                <span className="mdl-list__item-sub-title" style={{marginRght:10,marginLeft:10}}>   ₹.{tick.description}</span>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteTicket.bind(this,tick._id)} style={{cursor:'pointer'}}>delete</i>
              </span>
            </li>
            )
          })
        }
        </ul>
      }

      </div>
    );
  }

}

export default TicketPage;
