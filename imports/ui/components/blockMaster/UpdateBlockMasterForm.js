import React, { Component } from 'react';
import {  Header ,Segment, Form , Button} from 'semantic-ui-react'
class UpdateBlockMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockId:props.formData.blockId,
      blockName:props.formData.blockName,
    };
  }

  showSnackBar(msg){
    this.setState({error:msg});
  }

  setValue(field, event) {
    let object = {};
    object[field] = event.target.value;
    this.setState(object);
  }

  handleBlockMaster(e){
    e.preventDefault()
    const blockId = this.state.blockId.trim();
    const blockName = this.state.blockName.trim();

    if (blockId === '') {
      this.showSnackBar('Enter Block Id')
      return false;
    }
    if (blockName === '') {
      this.showSnackBar('Enter Block Name')
      return false;
    }
    this.showSnackBar('')
    const district ={
      _id:this.props.formData._id,blockId,blockName
    }
    if (this.state.blockId  === this.props.formData.blockId && this.state.blockName  === this.props.formData.blockName) {
      this.showSnackBar('EVERTHIG IS SAME')
    }else {
      Meteor.call('blockMaster.update',district,(err,result)=>{
        if (err) {
          this.showSnackBar(err.message)
          return false;
        }
        this.showSnackBar('Updated Successfully' )
        this.setState({blockName:'',blockId:''})
        this.props.closeModal()
      })
    }

  }


  render() {
    return (

      <Segment>
        <Form onSubmit={this.handleBlockMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number" placeholder="Enter Block ID" onChange={this.setValue.bind(this,'blockId')} value={this.state.blockId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text"  placeholder="Enter Block Name" onChange={this.setValue.bind(this,'blockName')} value={this.state.blockName}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default UpdateBlockMasterForm;
