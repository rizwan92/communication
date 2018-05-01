import React, { Component } from 'react';
import { StateMasterAPi } from '../../api/stateMaster';
import Modal from '../components/modal';
import StateMasterForm from '../components/stateMaster/StateMasterForm';
import UpdateStateMasterForm from '../components/stateMaster/UpdateStateMasterForm';
import {  Header,Table, Icon, Container} from 'semantic-ui-react'
import MyLoader from '../components/MyLoader';

class StateMasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states:[],
      action:false,
      isModalOpen: false,
      formData:null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }


  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe('AllStateMaster');
      let states = StateMasterAPi.find().fetch();
      this.setState({states});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }

  deleteState(id){
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('stateMaster.remove',id)
    }
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
      action:false,
      formData:null,
    })
  }
  openModal(formData) {
    this.setState({
      formData,
      isModalOpen: true,
      action : true ,
    })
  }


  render() {
    if (this.state.states.length == null) {
      return <MyLoader />
    }else {
      return (
        <Container  style={{padding:10}}>
          <Header as='h2' >State Master</Header>

          <StateMasterForm />


          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>State Name</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.states.map((st,i)=>{
                  return(
                    <tr key={i}>
                      <Table.Cell>{st.stateId}</Table.Cell>
                      <Table.Cell>{st.stateName}</Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='pencil' onClick={this.openModal.bind(this,st)}/></Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='delete' onClick={this.deleteState.bind(this,st._id)}/></Table.Cell>
                    </tr>
                  )
                })
              }
            </Table.Body>
          </Table>
          <Modal
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            style={modalStyle}>
            <Icon style={{fontSize:30,textAlign:'right',color:'red',cursor:'pointer'}} onClick={this.closeModal} name='remove' />
            {this.state.action ? <UpdateStateMasterForm formData= {this.state.formData} closeModal={this.closeModal}/> : null }
          </Modal>

        </Container>
      );
    }
  }

}

export default StateMasterPage;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};
