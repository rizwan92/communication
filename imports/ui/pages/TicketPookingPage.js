import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {EventApi} from '../../api/event';
import {TicketApi} from '../../api/ticket';
import {OrderApi} from '../../api/order';
import {Session} from 'meteor/session';

class TicketPookingPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      email:'',
      number:'',
      eventid:'',
      eventname:'',
      count:'',
      ticketid:"",
      ticketname:"",
      ticketids:[],
      tickets:[],
      paymenttype:'',
      paymentprice:'',
      bookedby:'',
      bookedbyid:'',
      paymentstatus:'',
      event:[],
      ticket:[],
      order:[],
    } ;
  }

  setValue(field, event) {
    if (field === 'eventid') {
      let myevent = this.state.event.find((ev)=> ev._id == event.target.value ? ev : null)
      let ticketid = myevent == undefined ? null : myevent.selectedticket ;
      let object = {};
      object[field] = event.target.value;
      object["ticketids"] = ticketid;
      object["eventname"] = myevent.title;
      this.setState(object);

    } else if (field == 'ticketid') {
      let myticket = this.state.ticket.find((ev)=> ev._id == event.target.value ? ev : null)
      let object = {};
      object["ticketname"] = myticket.name;
      object[field] = event.target.value;
      this.setState(object);

    }else {
      let object = {};
      object[field] = event.target.value;
      this.setState(object);
    }
  }

  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }


  handleDistrict(price,event){
    event.preventDefault();
    let name = this.state.name.trim();
    let email = this.state.email.trim();
    let number = this.state.number.trim();
    let eventid = this.state.eventid.trim();
    let ticketid = this.state.ticketid.trim();
    let paymenttype = "dashborad";
    let paymentprice = price;
    let bookedby = "user";
    let paymentstatus = "pending";
    let bookedbyid = Session.get('maroonuser')._id;

    this.state.tickets.map((tick,i)=>{
      if (tick.name === "") {
        this.showSnackBar(`Enter your ${i+1}  User Name` )
          throw "Too big";
      }
    })

    if (name === '') {
      this.showSnackBar("Enter Name")
      return false;
    }
    if (email === '') {
      this.showSnackBar("Enter Email")
      return false;
    }
    if (number === '') {
      this.showSnackBar("Enter Number")
      return false;
    }
    let order ={
      name,email,number,eventid,ticketid,paymenttype,paymentprice,bookedby,tickets:this.state.tickets,paymentstatus,bookedbyid
    }


    Meteor.call('order.insert',order,(err,res)=>{
      if (res) {
        this.sendemail(email,name,res,this.state.eventname,this.state.ticketname);
        this.sendsms(name,number,res,this.state.eventname)
        this.setState({name:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })
  }

  sendemail(toemail,toname,orderid,eventname,ticketname){
  let tickets = this.state.tickets.map((ticket)=>{
    return(ticket.name)
  })
  let names = tickets.toString();
  let html = `<html>
  <head>
      <title>Testing QR code</title>
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
      <script type="text/javascript">
      </script>
      <style>
      .msg{
        font-size:18px;
        margin:10px;
      }
      </style>
  </head>
  <body>
      <div class="msg">Thank you ${toname}, for booking tickets for ${eventname} ,</div>
      <div class="msg">You have booked ${tickets.length} tickets ,Category  ${ticketname}</div>
      <div class="msg"> Your order id is ${orderid} below is your qr code,</div>
      <div class="msg">Your ${ticketname} tickets are for ${names} </div>
      <div class="msg">PS- Every ticket holder has to bring there Photo ID compulsorily  </div>
      <div class="msg">You can also check your ticket detials by clicking on this link <a href="http://ticket.maroonentertainment.in/order/${orderid}">click here</a></div>
      <div class="msg"> Thanks ,Team Maroon Entertainment  </div>


    <img id='barcode'
          src="https://api.qrserver.com/v1/create-qr-code/?data=${orderid}&amp;size=200x200"
          alt=""
          title=${orderid}
          width="200"
          height="200" />
  </body>
</html>`;

  fetch('https://api.sendinblue.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': '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',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'MAROON', email: 'info@maroonentertainment.in' },
      to: [ { email: toemail, name: toname } ],
      htmlContent: html,
      textContent: 'text',
      subject: `Your tickets for ${eventname} `,
      replyTo: { email: 'info@maroonentertainment.in', name: 'MAROON' }
    }),
  }).then((response) => console.log(response))
      .catch((error) => {
        console.log("EMAIL EROROR");
        console.error(error);
      });
    }

sendsms(name,number,orderid,eventname){
  fetch(`http://api.msg91.com/api/sendhttp.php?sender=MAROON&route=4&country=91&message=Thank You ${name} for buying tickets your order id is ${orderid}
      Concert details - ${eventname} , Venue -  Raipur,Chhattisgarh
     link to get order detail is http://ticket.maroonentertainment.in/order/${orderid}
    &authkey=189400AOUmlmC15a3e1c68&mobiles=${number}`, {
      method: 'GET',
    }) .then((response) => console.log(response))
        .catch((error) => {
          console.log("SMSEROR");
          console.error(error);
        });
    }


  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allevent");
    Meteor.subscribe("allticket");
    Meteor.subscribe("allorder");
    let order = OrderApi.find({}).fetch();
    let event = EventApi.find({}).fetch();
    let ticket = TicketApi.find({}).fetch();
    this.setState({event,ticket,order});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteOrder(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('order.remove',id)
    }
  }
  selectticket(event){
    let value = event.target.value.split(":");
      this.setState({ticketid:value[0],paymentprice:value[1]})
  }

  onChangeHandler(event){
    let eventid = this.state.eventid;
    let ticketid = this.state.ticketid;
    let myticket = this.state.ticket.find((tick)=> tick._id == ticketid ? tick : null)

    if (eventid === '') {
      this.showSnackBar("select Event first")
      return false;
    }
    if (ticketid === '') {
      this.showSnackBar("select ticket first")
      return false;
    }

    const tickets =[];
    for (var i = 0; i <= parseInt(event.target.value)-1 ; i++) {
        let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
          tickets[i] = {
            id:id,
            ticketid:ticketid,
            price:myticket.price,
            name: "",
          }
    }
    this.setState({tickets})
  }

  handlenamechange(j,event){
  let tickets = this.state.tickets.slice();
  let newtickets = tickets.map((ticket,i)=>{
    if (i === j) {
      ticket.name = event.target.value;
      return ticket
    }else {
      return ticket;
    }
  })
  this.setState({tickets:newtickets})
}

  render() {
    price = 0
      let totalprice = this.state.tickets.map((ticket)=>{
        return price = price + parseInt(ticket.price);
      })

    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Bookings</h4><h6 style={{color:'blue'}}>{price}</h6>

      <form onSubmit={this.handleDistrict.bind(this,price)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Name</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'email')} value={this.state.email}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Email</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="number" id="sample1" onChange={this.setValue.bind(this,'number')} value={this.state.number}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Number</label>
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

        <select className="mdl-textfield__input"  id="sample1" value={this.state.ticketid} onChange={this.setValue.bind(this,'ticketid')} style={{margin:20}}>
          <option value="">Select Tickets</option>
          {
            this.state.ticket.map((tick,i)=>{
               let myevent = this.state.event.find((event)=> event._id == this.state.eventid ? event : null)
                  let ticketid = myevent == undefined ? null : myevent.selectedticket ;
                  if (ticketid != null) {
                      let exist = ticketid.find((tickid)=> tickid.toString() === tick._id)
                      if (exist) {
                        return(
                          <option value={tick._id} key={i}>{tick.name}</option>
                    )
                }
              }
          })
          }
        </select>

        <select className="mdl-textfield__input"  id="sample1" value={this.state.count} onChange={this.onChangeHandler.bind(this)} style={{margin:20}}>
          <option value="">Ticket Quantity</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>



        {
          this.state.tickets.map((tick,i)=>{
            return(
              <div className="mdl-textfield mdl-js-textfield" key={i}>
                <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.handlenamechange.bind(this,i)} value={this.state.tickets[i].name}/>
                <label className="mdl-textfield__label" htmlFor="sample1">{`${i+1} User name`}</label>
              </div>
            )
          })
        }

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      <table className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp" style={{width:'100%',marginTop:20}}>
        <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">User Name</th>
          <th>Email</th>
          <th>Contacts</th>
          <th>price</th>
          <th>qauntity</th>
          <th>action</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.order.map((ordr,i)=>{
            return(
              <tr key={i}>
                <td className="mdl-data-table__cell--non-numeric">{ordr.name}</td>
                <td>{ordr.email}</td>
                <td>{ordr.number}</td>
                <td>{ordr.paymentprice}</td>
                <td>{ordr.tickets.length}</td>
                <td><i className="material-icons" style={{color:'red',cursor:'pointer'}} onClick={this.deleteOrder.bind(this,ordr._id)}>delete_forever</i></td>
              </tr>
            )
          })
        }
        </tbody>
        </table>

      </div>
    );
  }

}

export default TicketPookingPage;
