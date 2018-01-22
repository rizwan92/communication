import React, { Component } from 'react';
import {UserApi} from '../../api/user';
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      agent:[],
      usertype:''
    } ;
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alluser");
    let agent  = UserApi.find({}).fetch();
    this.setState({ agent });
  });
  }
  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }

  componentWillUnmount() {
  this.linktracker.stop();
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
  }
  handleUserType(userid){
    let usertype = this.state.usertype;
    if (this.state.usertype == '') {
      this.showSnackBar("select user role first");
    }
    else {
      if (usertype == "delete") {
        let result = confirm("Want to delete?");
      if (result) {
          Meteor.call('user.remove',userid)
          this.setState({usertype:''})
        }
      }else {
        Meteor.call('user.updatedynamic',userid,'type',usertype,(err,res)=>{
          if (res) {
            this.showSnackBar("Role has been updated to "+ usertype);
            this.setState({usertype:''})
          }
        })
      }
    }
  }


  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

      <table className="mdl-data-table mdl-js-data-table  mdl-shadow--2dp" style={{width:'100%'}}>
        <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">User Name</th>
          <th>Email</th>
          <th>Contacts</th>
          <th>User Type</th>
          <th>Select</th>
          <th>Update</th>
        </tr>
        </thead>
        <tbody>
        {
          this.state.agent.map((agnt,i)=>{
            return(
              <tr key={i}>
                <td className="mdl-data-table__cell--non-numeric">{agnt.name}</td>
                <td>{agnt.email}</td>
                <td>{agnt.number}</td>
                <td>{agnt.type}</td>
                <td>
                <select className="mdl-textfield__input"  id={`sample${i}`} value={this.state.usertype} onChange={this.setValue.bind(this,'usertype')}  style={{margin:20}}>
                  <option value="">Select Type</option>
                  <option value="superadmin">superadmin</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  <option value="agent">agent</option>
                  <option value="delete">delete</option>
                </select>
                </td>
                <td> <button id={`demo-show-toast ${i}`} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" onClick={this.handleUserType.bind(this,agnt._id)}>Update</button></td>
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

export default UserPage;
