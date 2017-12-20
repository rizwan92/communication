import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import EventPage from '../pages/EventPage';
class MainLayouts extends Component {

  render() {
    return (
      <div>
      <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Home</span>
            <div className="mdl-layout-spacer"></div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
              <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                <i className="material-icons">search</i>
              </label>
              <div className="mdl-textfield__expandable-holder">
                <input className="mdl-textfield__input" type="text" id="search" />
                <label className="mdl-textfield__label" htmlFor="search">Enter your query...</label>
              </div>
            </div>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
              <i className="material-icons">more_vert</i>
            </button>
            <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
              <li className="mdl-menu__item">About</li>
              <li className="mdl-menu__item">Contact</li>
              <li className="mdl-menu__item">Legal information</li>
            </ul>
          </div>
        </header>
        <div className="demo-drawer mdl-layout__drawer mdl-color--black-grey-900 mdl-color-text--black-grey-50">
          <header className="demo-drawer-header">
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
          <nav className="demo-navigation mdl-navigation mdl-color--white-grey-800">
            <NavLink className="mdl-navigation__link" to="/home"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Home</NavLink>
            <NavLink className="mdl-navigation__link" to="/home/project"><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>Project</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Trash</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">report</i>Spam</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">forum</i>Forums</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">flag</i>Updates</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>Promos</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>Purchases</NavLink>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">people</i>Social</NavLink>
            <div className="mdl-layout-spacer"></div>
            <NavLink className="mdl-navigation__link" to=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></NavLink>
          </nav>
        </div>

        <main className="mdl-layout__content mdl-color--grey-100">
          <div className="mdl-grid demo-content">

          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/home/event" component={EventPage} />



        </div>
      </main>

      </div>
      <a href="https://github.com/google/material-design-lite/blob/mdl-1.x/templates/dashboard/" target="_blank" id="view-source" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white">View Source</a>
      </div>
    );
  }

}

export default MainLayouts;
