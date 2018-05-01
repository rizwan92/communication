import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import  AdminLayout1  from './layouts/AdminLayout1';
import  ResponsivePage  from './layouts/Responsive';
import  MainLayout  from './layouts/MainLayout';
import  LoginPage  from './pages/LoginPage';
export default class App extends Component {

  render(){
    return (
      <div>
        <Switch>
          <Route exact path="/" component={MainLayout} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/admin" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route exact path="/admin/organization" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route exact path="/admin/state" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route exact path="/admin/district" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route exact path="/admin/block" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route exact path="/admin/vidhansabha" render={() => Session.get('maroonuser') == undefined ? <Redirect to={{  pathname: '/login'}}/> : <AdminLayout1 />} />
          <Route component={NoMatch} />
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
