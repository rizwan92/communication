import React, { Component } from 'react';
import {  Menu, Icon, } from 'semantic-ui-react'

class MYSidebar extends Component {

  state = { activeItem: true }

  toggleVisibility = () => this.props.toggleVisibility()

  render() {
    const { activeItem }  = this.state;
    return (
      <div>
        <Menu>
          <Menu.Item
            name='sidebar'
            active={activeItem === 'editorials'}
            onClick={this.toggleVisibility}
          >
            <Icon name="sidebar" />
          </Menu.Item>

          <Menu.Item
            name='reviews'
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          >
           Reviews
          </Menu.Item>

          <Menu.Item
            name='upcomingEvents'
            active={activeItem === 'upcomingEvents'}
            onClick={this.handleItemClick}
          >
           Upcoming Events
          </Menu.Item>
        </Menu>
      </div>
    );
  }

}

export default MYSidebar;
