import React, { Component } from 'react';
import { DistrictMasterApi } from '../../api/districtMaster';
import { StateMasterAPi } from '../../api/stateMaster';
import Modal from '../components/modal';
import DistrictMasterForm from '../components/districtMaster/DistrictMasterForm';
import UpdateDistrictMasterForm from '../components/districtMaster/UpdateDistrictMasterForm';
import {  Header,Table, Icon, Container} from 'semantic-ui-react'
import MyLoader from '../components/MyLoader';

class DistrictMasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districts:[],
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
      Meteor.subscribe('AllDistrictMaster');
      let states = StateMasterAPi.find().fetch();
      let districts = DistrictMasterApi.find().fetch();
      this.setState({states,districts});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }



  deleteDistrict(id){
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('districtMaster.remove',id)
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
    if (this.state.states.length == 0) {
      return <MyLoader />
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
          <Header as='h2' >District Master</Header>

          <DistrictMasterForm states={states}/>


          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>District Name</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.districts.map((dist,i)=>{
                  return(
                    <tr key={i}>
                      <Table.Cell>{dist.districtId}</Table.Cell>
                      <Table.Cell>{dist.districtName}</Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='pencil' onClick={this.openModal.bind(this,dist)}/></Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='delete' onClick={this.deleteDistrict.bind(this,dist._id)}/></Table.Cell>
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
            {this.state.action ? <UpdateDistrictMasterForm formData= {this.state.formData} closeModal={this.closeModal}/> : null }
          </Modal>

        </Container>
      );
    }
  }

}

export default DistrictMasterPage;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};
