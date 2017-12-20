import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {EventApi} from '../../api/event';
import {TicketApi} from '../../api/ticket';
import {BookingApi} from '../../api/booking';

class TicketPookingPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      number:'',
      eventid:'',
      ticketid:'',
      paymenttype:'',
      paymentprice:'',
      bookedby:'',
      bookedbyid:'',
      paymentstatus:'',
      event:[],
      ticket:[],
      book:[],
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


  handleDistrict(event){
    event.preventDefault();
    let name = this.state.name.trim();
    if (name === '') {
      this.showSnackBar("Enter Name of District")
      return false;
    }
    Meteor.call('department.insert',name,(err,res)=>{
      if (res) {
        this.setState({name:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allevent");
    Meteor.subscribe("allticket");
    Meteor.subscribe("allbooking");
    let book = BookingApi.find({}).fetch();
    let event = EventApi.find({}).fetch();
    let ticket = TicketApi.find({}).fetch();
    this.setState({event,ticket,book});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteTicket(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('department.remove',id)
    }
  }
  selectticket(event){
    let value = event.target.value.split(":");
      this.setState({ticketid:value[0],paymentprice:value[1]})
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Bookings</h4><h6 style={{color:'blue'}}>{this.state.paymentprice}</h6>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">user name</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="number" id="sample1" onChange={this.setValue.bind(this,'number')} value={this.state.number}/>
          <label className="mdl-textfield__label" htmlFor="sample1">user number</label>
        </div>

        <select className="mdl-textfield__input"  id="sample1" value={this.state.eventid} onChange={this.setValue.bind(this,'eventid')} style={{margin:20}}>
          <option value="">Select Event</option>
          {
            this.state.event.map((evnt,i)=>{
            return(
              <option value={evnt._id} key={i}>{evnt.title}</option>
            )
          })
          }
        </select>


        <select className="mdl-textfield__input"  id="sample1" value={this.state.ticketid} onChange={this.selectticket.bind(this)} style={{margin:20}}>
          <option value="">Select Ticket</option>
          {
            this.state.ticket.map((tick,i)=>{
              let myevent = this.state.event.find((event)=> event._id == this.state.eventid ? event : null)
              let ticketid = myevent == undefined ? null : myevent.selectedticket ;
              if (ticketid != null) {
                  let exist = ticketid.find((tickid)=> tickid.toString() === tick._id)
                  if (exist) {
                    return(
                      <option value={tick._id+":"+tick.price} key={i}>{tick.name}</option>
                    )
                  }
              }
          })
          }
        </select>


        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.book.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.book.map((dep,i)=>{
            return(
              <li className="mdl-list__item" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{dep.name[0]}</i>
                <div style={{cursor:'pointer'}}>{dep.name}</div>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteDepartment.bind(this,dep._id)} style={{cursor:'pointer'}}>delete</i>
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

export default TicketPookingPage;
