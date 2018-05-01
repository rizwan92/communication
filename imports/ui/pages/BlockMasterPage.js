import React, { Component } from 'react';
import { DistrictMasterApi } from '../../api/districtMaster';
import { BlockMasterApi } from '../../api/blockMaster';
import Modal from '../components/modal';
import BlockMasterForm from '../components/blockMaster/BlockMasterForm';
import UpdateBlockMasterForm from '../components/blockMaster/UpdateBlockMasterForm';
import {  Header,Table, Icon, Container} from 'semantic-ui-react'
import MyLoader from '../components/MyLoader';

class BlockMasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districts:[],
      blocks:[],
      action:false,
      isModalOpen: false,
      formData:null,
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }


  componentWillMount() {
    this.linktracker = Tracker.autorun(() => {
      Meteor.subscribe('AllBlockMaster');
      Meteor.subscribe('AllDistrictMaster');
      let blocks = BlockMasterApi.find().fetch();
      let districts = DistrictMasterApi.find().fetch();
      this.setState({blocks,districts});
    });
  }
  componentWillUnmount() {
    this.linktracker.stop();
  }



  deleteBlock(id){
    let result = confirm('Want to delete?');
    if (result) {
      Meteor.call('blockMaster.remove',id)
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
          <Header as='h2' >Block Master</Header>

          <BlockMasterForm districts={districts}/>


          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Block Name</Table.HeaderCell>
                <Table.HeaderCell>Update</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                this.state.blocks.map((blok,i)=>{
                  return(
                    <tr key={i}>
                      <Table.Cell>{blok.blockId}</Table.Cell>
                      <Table.Cell>{blok.blockName}</Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='pencil' onClick={this.openModal.bind(this,blok)}/></Table.Cell>
                      <Table.Cell><Icon style={{cursor:'pointer'}} name='delete' onClick={this.deleteBlock.bind(this,blok._id)}/></Table.Cell>
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
            {this.state.action ? <UpdateBlockMasterForm formData= {this.state.formData} closeModal={this.closeModal}/> : null }
          </Modal>

        </Container>
      );
    }
  }

}

export default BlockMasterPage;

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0,0.5)'
  }
};
