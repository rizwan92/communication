import React, { Component } from 'react';
import {BrowserRouter as Router, withRouter, Route, NavLink} from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon, } from 'semantic-ui-react'
import OrganizationPage from '../pages/OrganizationPage';
import StateMasterPage from '../pages/StateMasterPage';
import DistrictMasterPage from '../pages/DistrictMasterPage';
import BlockMasterPage from '../pages/BlockMasterPage';
import VSMasterPage from '../pages/VSMasterPage';


class AdminLayout extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { visible, activeItem} = this.state;
    return (
      <Router>
        <div style={{height:'100vh',width:'100wh'}}>

          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical >
              <Menu.Item as='a' active><NavLink  to="/admin/organization">Organization</NavLink></Menu.Item>
              <Menu.Item as='a' active><NavLink  to="/admin/state">State</NavLink></Menu.Item>
              <Menu.Item as='a' active><NavLink  to="/admin/district">District</NavLink></Menu.Item>
              <Menu.Item as='a' active><NavLink  to="/admin/block">Block</NavLink></Menu.Item>
              <Menu.Item as='a' active><NavLink  to="/admin/vidhansabha">Vidhan Sabha</NavLink></Menu.Item>
              <Menu.Item as='a' active><NavLink  to="/admin/organization">Home</NavLink></Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>

              <Menu>
                <Menu.Item
                  name='editorials'
                  active={activeItem === 'editorials'}
                  onClick={this.toggleVisibility}
                >
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>


              <Route exact path="/admin/organization"  render={props =><OrganizationPage {...props} search={this.state.search} />}/>
              <Route exact path="/admin/state"  render={props =><StateMasterPage {...props} search={this.state.search} />}/>
              <Route exact path="/admin/district"  render={props =><DistrictMasterPage {...props} search={this.state.search} />}/>
              <Route exact path="/admin/block"  render={props =><BlockMasterPage {...props} search={this.state.search} />}/>
              <Route exact path="/admin/vidhansabha"  render={props =><VSMasterPage {...props} search={this.state.search} />}/>

            </Sidebar.Pusher>
          </Sidebar.Pushable>



        </div>
      </Router>
    );
  }

}

export default withRouter(AdminLayout);
