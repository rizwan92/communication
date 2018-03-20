import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import  MainLayout  from './layouts/MainLayout';
import  AdminLayout  from './layouts/AdminLayout';
import  OrderLayout  from './layouts/OrderLayout';
import  LoginPage  from './pages/LoginPage';
export default class App extends Component {

  render(){
   return (
      <div>
      <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home/event" component={MainLayout} />
            <Route exact path="/order/:id" component={OrderLayout} />
            <Route exact path="/admin" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/home" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/event" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/project" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/tickets" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/agents" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/bookings" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/users" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route exact path="/admin/projectallotment" render={props => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout />} />
            <Route component={NoMatch}/>
        </Switch>
     </div>
   )
 }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
