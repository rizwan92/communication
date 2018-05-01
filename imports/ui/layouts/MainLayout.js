import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'

import { Grid } from 'semantic-ui-react'

class MainLayouts extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
     const { visible } = this.state
    return (
      <div>
          <div>
          <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
                <Grid columns={2} divided>
               <Grid.Row>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
               </Grid.Row>

               <Grid.Row>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
                 <Grid.Column>
                   <Image src='https://react.semantic-ui.com/assets/images/wireframe/media-paragraph.png' />
                 </Grid.Column>
               </Grid.Row>
             </Grid>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
   </div>
    );
  }

}

export default MainLayouts;
