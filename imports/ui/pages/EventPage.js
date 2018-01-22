import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import { EventApi } from '../../api/event';
import {TicketApi} from '../../api/ticket';


class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      subtitle:'',
      description:'',
      venue:'',
      date:'',
      image:'',
      eventstate:'',
      event:[],
      ticket:[],
      selectedticket:[],
    };
  }



  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allevent");
    Meteor.subscribe("allticket");
    let event = EventApi.find({}).fetch();
    let ticket = TicketApi.find({}).fetch();
    this.setState({event,ticket});
  });
}
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
  }

  componentWillUnmount() {
  this.linktracker.stop();
  }
  uploadWidget() {
    let setImagelinkState = (link)=> {
      this.setState({image:link});
    }
           cloudinary.openUploadWidget({ cloud_name: 'da0lzfub2', upload_preset: 'rbrkicgp', tags:['xmas']},
               function(error, result) {
                 if (error) {
                 }else {
                   setImagelinkState(result[0].secure_url);
                 }
               });
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }


  handleDistrict(event){
    event.preventDefault();
    let title = this.state.title.trim();
    let subtitle = this.state.subtitle.trim();
    let description = this.state.description.trim();
    let venue = this.state.venue.trim();
    let date = new Date(this.state.date);
    let image = this.state.image.trim();
    let eventstate = this.state.eventstate.trim();

    if (title === '') {
      this.showSnackBar("Enter title of event")
      return false;
    }
    if (subtitle === '') {
      this.showSnackBar("Enter subtitle of event")
      return false;
    }
    if (description === '') {
      this.showSnackBar("Enter description of event")
      return false;
    }
    if (venue === '') {
      this.showSnackBar("Enter venue of event")
      return false;
    }
    if (date === '') {
      this.showSnackBar("Enter date of event")
      return false;
    }
    if (image === '') {
      this.showSnackBar("Enter image of event")
      return false;
    }
    if (eventstate === '') {
      this.showSnackBar("Enter eventstate of event")
      return false;
    }

    if(this.state.selectedticket.length == 0){
      this.showSnackBar("Tickets not Selected")
      return false;
    }
    let selectedticket = this.state.selectedticket

    let event1 = {
      title,subtitle,description,venue,date,image,eventstate,selectedticket,
    }
    Meteor.call('event.insert',event1,(err,res)=>{
      if (res) {
        this.setState({title:'',subtitle:'',description:'',venue:'',date:'',image:'',eventstate:'',selectedticket:[]} )
        this.showSnackBar(title +"  Entered Successfully")
        location.reload();
      }
    })


}
  inserinto(id){
  let ticket = this.state.selectedticket.find((tick)=>{
      if (tick === id) {
        return tick
      }
    })
  if (ticket == undefined) {
    let temptickets = this.state.selectedticket;
      temptickets.push(id);
      this.setState({selectedticket:temptickets})
  }else {
      let temptickets = this.state.selectedticket;
      $.each(temptickets, function(i){
          if(temptickets[i] === ticket) {
              temptickets.splice(i,1);
              return false;
          }
      });
      this.setState({selectedticket:temptickets})
     }
  }

  render() {
    // let searchproject = this.state.project.filter((project)=>{
    //   return(project.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !==-1)
    // })
    // searchproject = this.state.project.filter((project)=>{
    //   return(project.tspareaid.toLowerCase().indexOf(this.state.tspareaid.toLowerCase()) !==-1)
    // })

    return (
      <div className="demo-cards mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--32-spacing mdl-color--white mdl-shadow--2dp" style={{display:'flex',flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>

      <form onSubmit={this.handleDistrict.bind(this)}>

      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'title')} value={this.state.title}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Event Title</label>
        </div>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'subtitle')} value={this.state.subtitle}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Event Subtitle</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'description')} value={this.state.description}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Event Description</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'venue')} value={this.state.venue}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Event Venue</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="date" id="sample1" onChange={this.setValue.bind(this,'date')} value={this.state.date}/>
          <label className="mdl-textfield__label" htmlFor="sample1"></label>
        </div>
          <select className="mdl-textfield__input"  id="sample1" value={this.state.eventstate} onChange={this.setValue.bind(this,'eventstate')}  style={{margin:20}}>
            <option value="">Event State</option>
            <option value="1">Previous</option>
            <option value="2">Current</option>
            <option value="3">Up Comings</option>
          </select>


          <ul className="demo-list-control mdl-list">
          {
            this.state.ticket.map((tick,i)=>{
            return(
              <li className="mdl-list__item" key={i} style={{width:'100%'}}>
                <span className="mdl-list__item-primary-content">{tick.name}</span>
                <span className="mdl-list__item-primary-content"> ₹.{tick.price}</span>
                <span className="mdl-list__item-secondary-action">
                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="list-checkbox-1">
                    <input type="checkbox" id="list-checkbox-1" className="mdl-checkbox__input" onChange={this.inserinto.bind(this,tick._id)}/>
                  </label>
                </span>
              </li>

            )
          })
        }
            </ul>

            <span className="mdl-chip" style={{cursor:'pointer',margin:10}} onClick={this.uploadWidget.bind(this)}>
            <span className="mdl-chip__text">images upload</span>
            </span>


        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>








      </div>
    );
  }

}

export default EventPage;
