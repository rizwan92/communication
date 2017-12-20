import React, { Component } from 'react';
import {BrowserRouter as Router,Route, Link, NavLink, withRouter, Redirect} from 'react-router-dom';
import TicketPage from '../pages/TicketPage';
import AgentPage from '../pages/AgentPage';
import TicketPookingPage from '../pages/TicketPookingPage';
import SchemePage from '../pages/SchemePage';
import HomePage from '../pages/HomePage';
import EventPage from '../pages/EventPage';

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:'',
    };
  }

  render() {
    return (
      <Router>
      <div>
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header" style={{height:'100vh'}}>
        <header className="demo-header mdl-layout__header mdl-color--teal-300 mdl-color-text--black-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Home</span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search" onChange={(e)=>{this.setState({search:e.target.value})}}/>
                <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
              <li className="mdl-menu__item" onClick={()=>{location.reload();}}>Reload</li>
              <li className="mdl-menu__item">Contact</li>
              <li className="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--white-grey-900 mdl-color-text--black-grey-50">
          <header className="demo-drawer-header mdl-color--teal-300 mdl-color-text--black-600" >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zOF8VxM6oNgGrfW1832Wpq-gRpuXUvGorYwpjXwUoBmz2MNV" className="demo-avatar" />
            <div className="demo-avatar-dropdown">
              <span>hello@example.com</span>
              <div className="mdl-layout-spacer"></div>
              <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                <i className="material-icons" role="presentation">arrow_drop_down</i>
                <span className="visuallyhidden">Accounts</span>
              </button>
              <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                <li className="mdl-menu__item">hello@example.com</li>
                <li className="mdl-menu__item">info@example.com</li>
                <li className="mdl-menu__item"><i className="material-icons">add</i>Add another account...</li>
              </ul>
            </div>
          </header>
          <nav className="demo-navigation mdl-navigation mdl-color--black-grey-800">
            <NavLink className="mdl-navigation__link" to="/admin/home"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/event"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Events</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/tickets"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Tickets</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/agents"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Agents</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/bookings"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Bookings</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/scheme"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Scheme</NavLink>
            <NavLink className="mdl-navigation__link" to="/admin/projectallotment"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Projects</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</NavLink>
            <div className="mdl-layout-spacer"></div>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></NavLink>
          </nav>
        </div>

        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">

          <Route exact path="/admin"  render={props =><HomePage {...props} search={this.state.search} />} />
          <Route exact path="/admin/home"  render={props =><HomePage {...props} search={this.state.search} />} />
          <Route exact path="/admin/event"  render={props =><EventPage {...props} search={this.state.search} />}/>
          <Route exact path="/admin/tickets"  render={props =><TicketPage {...props} search={this.state.search} />} />
          <Route exact path="/admin/agents"  render={props =><AgentPage {...props} search={this.state.search} />} />
          <Route exact path="/admin/bookings"  render={props =><TicketPookingPage {...props} search={this.state.search} />} />
          <Route exact path="/admin/scheme"  render={props =><SchemePage {...props} search={this.state.search} />} />


        </div>
      </main>

      </div>

      <div id="demo-toast-example" className="mdl-js-snackbar mdl-snackbar">
      <div className="mdl-snackbar__text"></div>
      <button className="mdl-snackbar__action" type="button"></button>
      </div>

      </div>
      </Router>
    );
  }

}

export default AdminLayout;
