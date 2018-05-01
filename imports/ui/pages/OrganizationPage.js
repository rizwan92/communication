import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import { StateMasterAPi } from '../../api/stateMaster';
import { OrganizationApi } from '../../api/organization';
import { Segment, Header,Button, Dropdown, Form, Table, Label, Icon, Container, Image, Loader, Dimmer} from 'semantic-ui-react'
import MyLoader from '../components/MyLoader';

class OrganizationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName:'',
      stateId:'',
      states:[],
      organizations:[],
      error:'',
    };
  }




  setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe('AllStateMaster');
      Meteor.subscribe('AllOrganization');
      let states = StateMasterAPi.find().fetch();
      let organizations = OrganizationApi.find().fetch();
      this.setState({states,organizations});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }



  showSnackBar(msg){
    this.setState({error:msg});
  }


  handleOrg(event){
    event.preventDefault();
    let orgName = this.state.orgName.trim();
    let stateId = this.state.stateId.trim();
    if (orgName === '') {
      this.showSnackBar('Enter Organization Name')
      return false;
    }
    if (stateId === '') {
      this.showSnackBar('Select the State')
      return false;
    }
    this.showSnackBar('')
    const org = {
      orgName,stateId
    }
    Meteor.call('organizations.insert',org,(err,res)=>{
      if (err) {
        this.showSnackBar(err.message)
      }
      this.showSnackBar(orgName + ' Entered Successfully')
      this.setState({orgName:'',stateId:''})
    })
  }

  render() {
    if (this.state.states.length == null) {
      return (
        <MyLoader />
      )
    }else {
      let states = this.state.states.map((st)=> {
        let obj = {
          key:st._id,
          text:st.stateName,
          value:st._id
        }
        return obj
      })
      return (
        <Container  style={{padding:10}}>
          <Header as='h2' >Organizations</Header>
          <Segment>
            <Form onSubmit={this.handleOrg.bind(this)} style={{width:'60%'}}>
              <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>

              <Form.Field >
                <input  type="text" placeholder="Enter Your Organization Name" onChange={this.setValue.bind(this,'orgName')} value={this.state.orgName}/>
              </Form.Field>
              <Form.Field>
                <Dropdown placeholder='Select State' fluid selection options={states}  value={this.state.stateId}  onChange={(event,data)=>this.setState({stateId:data.value})}/>
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>

          </Segment>
          <Segment>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Organization Name</Table.HeaderCell>
                  <Table.HeaderCell>Update</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  this.state.organizations.map((org,i)=>{
                    return(
                      <Table.Row key={i}>
                        <Table.Cell>
                          <Label ribbon>First</Label>
                          {org.orgName}
                        </Table.Cell>
                        <Table.Cell><Icon style={{cursor:'pointer'}} name='pencil' /></Table.Cell>
                        <Table.Cell><Icon style={{cursor:'pointer'}} name='delete' /></Table.Cell>
                      </Table.Row>
                    )
                  })
                }

              </Table.Body>
            </Table>
          </Segment>
        </Container>
      );
    }
  }

}

export default OrganizationPage;
