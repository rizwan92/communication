import React, { Component } from 'react';
import './orderlayout.css';
import {OrderApi} from '../../api/order';
import {TicketApi} from '../../api/ticket';

var QRCode = require('qrcode.react');
class OrderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order:null,
      ticket:[],
    };
  }
  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allorder");
    Meteor.subscribe("allticket");
    let order  = OrderApi.find({_id:this.props.match.params.id}).fetch();
    let ticket  = TicketApi.find({}).fetch();
    this.setState({ order:order[0],ticket});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }

  render() {
    if (this.state.order == null ) {
      return <div style={{position:'fixed',top:'50%',left:'50%',width:200,height:200}} className="mdl-spinner mdl-js-spinner is-active"></div> ;
    }else {

       let complete = this.state.ticket.map((alltick)=>{
        this.state.order.tickets.map((ordtick)=>{
          if (ordtick.ticketid === alltick._id) {
              ordtick.tickname  = alltick.name
          }
        })
      })
      return (
        <div className="ordercss" >
        <div className="mdl-card mdl-card-order mdl-shadow--8dp">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Ticket Details</h2>
          </div>
          <div className="mdl-card__supporting-text mdl-grid" style={{flex:1,justifyContent:'center',flexFlow:'column',alignItems:'center'}}>
            <QRCode value={this.props.match.params.id} size={150}/>
            <div className="mdl-card__title">
              <h2 className="mdl-card__title-text">Ticket & QR Code Diljit Dosanjh Live Concert In Raipur</h2>
            </div>
            <div style={{display:'flex',flex:1,flexFlow:'column',justifyContent:'center',alignItems:'center'}}>

              <div style={{fontSize:15,color:'black',margin:10,fontSize:20,fontWeight:'bold'}}>Email</div>
              <div style={{fontSize:15,color:'black'}}>{this.state.order.email}</div>
              <div style={{fontSize:15,color:'black',margin:10,fontSize:20,fontWeight:'bold'}}>name</div>
              <div style={{fontSize:15,color:'black'}}>{this.state.order.name}</div>
              <div style={{fontSize:15,color:'black',margin:10,fontSize:20,fontWeight:'bold'}}>number</div>
              <div style={{fontSize:15,color:'black'}}>{this.state.order.number}</div>

            </div>
            <hr />
            <hr />
            <div style={{display:'flex',flex:1,flexFlow:'column',justifyContent:'center',alignItems:'center',width:'100%'}}>
              {
                this.state.order.tickets.map((tickets,i)=>{
                  return(
                    <div style={{display:'flex',flex:1,width:'100%',justifyContent:'space-around',margin:10}} key={i}>
                    <div style={{fontSize:15,color:'black',fontSize:20,fontWeight:'bold'}}>{tickets.name}</div>
                    <div style={{fontSize:15,color:'black'}}>{tickets.price}</div>
                    <div style={{fontSize:15,color:'black'}}>{tickets.tickname}</div>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>
        </div>
      );
    }
  }

}

export default OrderLayout;
