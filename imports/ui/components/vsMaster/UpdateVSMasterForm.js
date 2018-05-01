import React, { Component } from 'react';
import {  Header ,Segment, Form , Button} from 'semantic-ui-react'
class UpdateVSMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vsId:props.formData.vsId,
      vsName:props.formData.vsName,
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

  handleVSMaster(e){
    e.preventDefault()
    const vsId = this.state.vsId.trim();
    const vsName = this.state.vsName.trim();

    if (vsId === '') {
      this.showSnackBar('Enter Block Id')
      return false;
    }
    if (vsName === '') {
      this.showSnackBar('Enter Block Name')
      return false;
    }
    this.showSnackBar('')
    const district ={
      _id:this.props.formData._id,vsId,vsName
    }
    if (this.state.vsId  === this.props.formData.vsId && this.state.vsName  === this.props.formData.vsName) {
      this.showSnackBar('EVERTHIG IS SAME')
    }else {
      Meteor.call('vsMaster.update',district,(err,result)=>{
        if (err) {
          this.showSnackBar(err.message)
          return false;
        }
        this.showSnackBar('Updated Successfully' )
        this.setState({vsName:'',vsId:''})
        this.props.closeModal()
      })
    }

  }


  render() {
    return (

      <Segment>
        <Form onSubmit={this.handleVSMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number" placeholder="Enter Vidhan Shabha ID" onChange={this.setValue.bind(this,'vsId')} value={this.state.vsId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text"  placeholder="Enter Vidhan Shabha Name" onChange={this.setValue.bind(this,'vsName')} value={this.state.vsName}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default UpdateVSMasterForm;
