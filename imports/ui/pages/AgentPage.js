import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {UserApi} from '../../api/user';

class AgentPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      email:'',
      number:'',
      city:'',
      address:'',
      agent:[],
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

  fixdigitgenerator (length) {
   return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}


  handleDistrict(event){
    event.preventDefault();
    let name = this.state.name.trim();
    let email = this.state.email.trim();
    let number = this.state.number.trim();
    let city = this.state.city.trim();
    let address = this.state.address.trim();
    let password = this.fixdigitgenerator(6)
    if (name === '') {
      this.showSnackBar("Enter Name of Agent")
      return false;
    }
    if (email === '') {
      this.showSnackBar("Enter email of Agent")
      return false;
    }
    if (number === '') {
      this.showSnackBar("Enter number of Agent")
      return false;
    }
    if (city === '') {
      this.showSnackBar("Enter city of Agent")
      return false;
    }
    if (address === '') {
      this.showSnackBar("Enter address of Agent")
      return false;
    }
    let agent = {
        name,email,number,city,address,password,image:'',type:'agent'
    }
    Meteor.call('user.insert',agent,(err,res)=>{
      if (res) {
        this.setState({name:'',districtid:'',areatype:''} )
        this.showSnackBar(name+" Entered Successfully")
          location.reload();
      }
    })


  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alluser");
    let agent  = UserApi.find({type:'agent'}).fetch();
    this.setState({ agent });
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteAgent(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('tsparea.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Agent</h4>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Agent Name</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="email" id="sample1" onChange={this.setValue.bind(this,'email')} value={this.state.email}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Agent Email</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="number" id="sample1" onChange={this.setValue.bind(this,'number')} value={this.state.number}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Agent Number</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'city')} value={this.state.city}/>
          <label className="mdl-textfield__label" htmlFor="sample1">City</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'address')} value={this.state.address}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Full Address</label>
        </div>

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.agent.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.agent.map((tsp,i)=>{
            return(
              <li className="mdl-list__item mdl-list__item--two-line" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{tsp.name[0].toUpperCase()}</i>
                <div style={{cursor:'pointer'}}>{tsp.name}</div>
                 <span className="mdl-list__item-sub-title">{tsp.city}</span>
                 <span className="mdl-list__item-sub-title"> {tsp.address}</span>
              </span>
              <span className="mdl-list__item-primary-content" >
                <span className="mdl-list__item-sub-title">phone : {tsp.number}</span>
                <span className="mdl-list__item-sub-title">password : {tsp.password}</span>
              </span>
              <span className="mdl-list__item-secondary-action" style={{marginLeft:10}}>
              <i className="material-icons" onClick={this.deleteAgent.bind(this,tsp._id)} style={{cursor:'pointer'}}>delete</i>
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

export default AgentPage;
