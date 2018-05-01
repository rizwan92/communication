import React, { Component } from 'react';
import { DistrictMasterApi } from '../../api/districtMaster';
import { VSMasterApi } from '../../api/vsMaster';
import Modal from '../components/modal';
import VSMasterForm from '../components/vsMaster/VSMasterForm';
import UpdateVSMasterForm from '../components/vsMaster/UpdateVSMasterForm';
import {  Header,Table, Icon, Container} from 'semantic-ui-react'
import MyLoader from '../components/MyLoader';

class VSMasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districts:[],
      vss:[],
      action:false,
      isModalOpen: false,
      formData:null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }


  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe('AllVSMaster');
      Meteor.subscribe('AllDistrictMaster');
      let vss = VSMasterApi.find().fetch();
      let districts = DistrictMasterApi.find().fetch();
      this.setState({vss,districts});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }



  deleteBlock(id){
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('vsMaster.remove',id)
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
    if (this.state.districts.length == 0) {
      return <MyLoader />
    }else {
      let districts = this.state.districts.map((dist)=> {
        let obj = {
          key:dist._id,
          text:dist.districtName,
          value:dist._id
        }
        return obj
      })
      return (
        <Container  style={{padding:10}}>
          <Header as='h2' >Vidhan Shabha Master</Header>

          <VSMasterForm districts={districts}/>


          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Vidhan Shabha Name</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.vss.map((vs,i)=>{
                  return(
                    <tr key={i}>
                      <Table.Cell>{vs.vsId}</Table.Cell>
                      <Table.Cell>{vs.vsName}</Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='pencil' onClick={this.openModal.bind(this,vs)}/></Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='delete' onClick={this.deleteBlock.bind(this,vs._id)}/></Table.Cell>
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
            {this.state.action ? <UpdateVSMasterForm formData= {this.state.formData} closeModal={this.closeModal}/> : null }
          </Modal>

        </Container>
      );
    }
  }

}

export default VSMasterPage;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};
