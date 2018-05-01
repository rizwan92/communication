import React, { Component } from 'react';
import {  Header ,Segment, Form , Button} from 'semantic-ui-react'
class UpdateDistrictMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districtId:props.formData.districtId,
      districtName:props.formData.districtName,
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

  handleDistrictMaster(e){
    e.preventDefault()
    const districtId = this.state.districtId.trim();
    const districtName = this.state.districtName.trim();

    if (districtId === '') {
      this.showSnackBar('Enter District Id')
      return false;
    }
    if (districtName === '') {
      this.showSnackBar('Enter District Name')
      return false;
    }
    this.showSnackBar('')
    const district ={
      _id:this.props.formData._id,districtId,districtName
    }
    if (this.state.districtId  === this.props.formData.districtId && this.state.districtName  === this.props.formData.districtName) {
      this.showSnackBar('EVERTHIG IS SAME')
    }else {
      Meteor.call('districtMaster.update',district,(err,result)=>{
        if (err) {
          this.showSnackBar(err.message)
          return false;
        }
        this.showSnackBar('Updated Successfully' )
        this.setState({districtName:"",districtId:""})
        this.props.closeModal()
      })
    }

  }


  render() {
    return (

      <Segment>
        <Form onSubmit={this.handleDistrictMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number" placeholder="Enter District ID" onChange={this.setValue.bind(this,'districtId')} value={this.state.districtId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text"  placeholder="Enter District Name" onChange={this.setValue.bind(this,'districtName')} value={this.state.districtName}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default UpdateDistrictMasterForm;
