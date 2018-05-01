import React, { Component } from 'react';
import {withRouter } from 'react-router-dom'
import { Session } from 'meteor/session';
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      number:'',
      password:'',
      cpassword:'',
      city:'',
      address:'',
      condition:true,
    } ;
  }


  setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }
  handleLogin(event) {
    event.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const router=this;
    if (email === 'admin' &&  password === 'admin') {
      const user = {
        name:'Super admin',
        email:'superadmin@gmail.com',
        number:989,
        password:989,
        city:'Raipur',
        address:'Beside BSNL Tower Raipur',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4k5IXeq4F-Oct1Fmf1nlf3XXZ4vNly-6y_4nHnQXMP2RCEQv',
        type:'superadmin',
        status:1,
        createdAt: new Date(),
      }
      Session.setPersistent('maroonuser', user)
      router.props.history.push('/admin')
    }
    Meteor.call('user.checkemailandpassword',email,password,(err,res)=>{
      if (res) {
        if (res.type == null || res.type === '') {
          Bert.alert( 'you are registered but not authorized ', 'warning', 'growl-top-right' );
        }else {
          Bert.alert( 'succefull logged in', 'success', 'growl-top-right' );
          Session.setPersistent('maroonuser', res)
          router.props.history.push('/admin')
        }
      }else {
        Bert.alert( 'User not registered', 'warning', 'growl-top-right' );
      }
    }
    )
    this.setState({
      password:'',
    });
  }
  handleRegisteration(event) {
    event.preventDefault();
    const name = this.state.name.trim();
    const email = this.state.email.trim();
    const number =this.state.number.trim();
    const password = this.state.password.trim();
    const cpassword = this.state.cpassword.trim();
    const city = this.state.city.trim();
    const address = this.state.address.trim();
    if (password === cpassword) {
      Meteor.call('user.check',email,password ,(error,result)=>{
        if (result) {
          Bert.alert( 'Email already Exist', 'danger', 'growl-top-right' );
        }else {
          const user={
            name,email,number,password,city,address
          }
          Meteor.call('user.insert',user,(er,res)=>{
            if (!er) {
              Bert.alert( 'Successfull Registered', 'success', 'growl-top-right' );
              this.setState({condition:!this.state.condition})
            }
          });
        }
      });
    }else {
      Bert.alert( 'password doesn\'t match', 'danger', 'growl-top-right' );
    }
    this.setState({
      rpassword:'',
      rconfirmPassword:'',
    });
  }




  render() {
    return (
      <div>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" style={{display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center',backgroundColor:'#efefef',height:'100vh'}}>


          <div className=" mdl-color--white mdl-shadow--2dp" style={{width:300,borderRadius:5,padding:20,display:'flex',flexFlow:'column',justifyContent:'center',alignItems:'center'}}>
            <h4>{this.state.condition ? 'Login' : 'Register'}</h4>

            {
              this.state.condition ?
                <form onSubmit={this.handleLogin.bind(this)}>
                  <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

                    <div className="mdl-textfield mdl-js-textfield" >
                      <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'email')} value={this.state.email}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Email</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="text" id="sample2" onChange={this.setValue.bind(this,'password')} value={this.state.password}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Password</label>
                    </div>

                    <button id="demo-show-toast" className="mdl-button mdl-color--#efefef mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Login</button>
                  </div>
                </form>
                :
                <form onSubmit={this.handleRegisteration.bind(this)}>
                  <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

                    <div className="mdl-textfield mdl-js-textfield" >
                      <input className="mdl-textfield__input" type="text" id="sample3" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Name</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="email" id="sample4" onChange={this.setValue.bind(this,'email')} value={this.state.email}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Email</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="number" id="sample5" onChange={this.setValue.bind(this,'number')} value={this.state.number}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Number</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="text" id="sample6" onChange={this.setValue.bind(this,'city')} value={this.state.city}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">City</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="text" id="sample7" onChange={this.setValue.bind(this,'address')} value={this.state.address}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Address</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="password" id="sample8" onChange={this.setValue.bind(this,'password')} value={this.state.password}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Password</label>
                    </div>


                    <div className="mdl-textfield mdl-js-textfield">
                      <input className="mdl-textfield__input" type="password" id="sample9" onChange={this.setValue.bind(this,'cpassword')} value={this.state.cpassword}/>
                      <label className="mdl-textfield__label" htmlFor="sample1">Confirm Password</label>
                    </div>

                    <button id="demo-show-toast" className="mdl-button mdl-color--#efefef mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Register</button>
                  </div>
                </form>
            }

            <div style={{cursor:'pointer',margin:10,color:'blue',marginLeft:200}} onClick={()=>{this.setState({condition:!this.state.condition})}}>{this.state.condition ?  'Register ?' : 'Login ?'}</div>
          </div>

        </div>
      </div>
    );
  }

}

export default withRouter(LoginPage);
