import React, { Component } from 'react';
import { EventApi } from '../../api/event';
class HomePage extends Component {

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allevent");
    let event = EventApi.find({}).fetch();
    this.setState({event});
  });
}
  componentWillUnmount() {
  this.linktracker.stop();
  }

  deleteEvent(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('event.remove',id)
    }
  }


  render() {

    return (
      <div>
      <div className="demo-cards mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--32-spacing" style={{display:'flex',flex:1,justifyContent:'center',flexWrap:'wrap',height:'100%'}}>

      {
        this.state.event.map((evnt,i)=>{
          return(
            <div className="demo-card-wide mdl-card mdl-shadow--2dp"  key={i} style={{margin:10}}>
              <div className="mdl-card__title" style={{background:`url('${evnt.image}')`,backgroundPosition:'center center',backgroundSize:'100% auto'}}>
                <h6 className="mdl-card__title-text">{evnt.title}</h6>
              </div>
              <div className="mdl-card__supporting-text">{evnt.subtitle}</div>
              <div className="mdl-card__supporting-text">{evnt.description}</div>
              <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  Get Started
                </a>
              </div>
              <div className="mdl-card__menu">
                <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                  <i className="material-icons" onClick={this.deleteEvent.bind(this,evnt._id)}>share</i>
                </button>
              </div>
            </div>
            )
        })
      }







      </div>
      </div>
    );
  }

}

export default HomePage;
