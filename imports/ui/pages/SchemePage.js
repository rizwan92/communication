import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
// import {DepartmentApi} from '../../api/department';
import {EventApi} from '../../api/event';

class SchemePage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      departmentid:'',
      department:[],
      scheme:[],
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
    let departmentid = this.state.departmentid.trim();
    if (name === '') {
      this.showSnackBar("Enter Name Scheme")
      return false;
    }
    if (departmentid === '') {
      this.showSnackBar("Select Department")
      return false;
    }
    let scheme = {
        name,departmentid,
    }
    Meteor.call('scheme.insert',scheme,(err,res)=>{
      if (res) {
        this.setState({name:'',departmentid:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })


  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alldepartment");
    Meteor.subscribe("allscheme");
    let department = DepartmentApi.find({}).fetch();
    let scheme = SchemeApi.find({}).fetch();
    this.setState({department,scheme});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteScheme(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('scheme.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Scheme Entry/Edit/Delete</h4>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Scheme Name</label>
        </div>
        <select className="mdl-textfield__input"  id="sample1" value={this.state.departmentid} onChange={this.setValue.bind(this,'departmentid')} style={{margin:20}}>
          <option value="">Select Department</option>
          {
            this.state.department.map((dep,i)=>{
            return(
              <option value={dep._id} key={i}>{dep.name}</option>
            )
          })
          }
        </select>

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.scheme.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.scheme.map((sch,i)=>{
            return(
              <li className="mdl-list__item mdl-list__item--two-line" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{sch.name[0]}</i>
                <div style={{cursor:'pointer'}}>{sch.name}</div>
                 <span className="mdl-list__item-sub-title"> {sch.departmentid}</span>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteScheme.bind(this,sch._id)} style={{cursor:'pointer'}}>delete</i>
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

export default SchemePage;
