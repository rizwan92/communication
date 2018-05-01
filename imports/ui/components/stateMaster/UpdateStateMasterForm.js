import React, { Component } from 'react';
import {  Header ,Segment, Form , Button} from 'semantic-ui-react'
class UpdateStateMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateId:props.formData.stateId,
      stateName:props.formData.stateName,
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

  handleStateMaster(e){
    e.preventDefault()
    const stateId = this.state.stateId.trim();
    const stateName = this.state.stateName.trim();

    if (stateId === '') {
      this.showSnackBar('Enter State Id')
      return false;
    }
    if (stateName === '') {
      this.showSnackBar('Enter State Name')
      return false;
    }
    this.showSnackBar('')
    const state ={
      _id:this.props.formData._id,stateId,stateName
    }
    if (this.state.stateId  === this.props.formData.stateId && this.state.stateName  === this.props.formData.stateName) {
      this.showSnackBar('EVERTHIG IS SAME')
    }else {
      Meteor.call('stateMaster.update',state,(err,result)=>{
        if (err) {
          this.showSnackBar(err.message)
          return false;
        }
        this.showSnackBar('Updated Successfully' )
        this.setState({stateName:"",stateId:""})
        this.props.closeModal()
      })
    }

  }


  render() {
    return (

      <Segment>
        <Form onSubmit={this.handleStateMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number" placeholder="Enter State ID" onChange={this.setValue.bind(this,'stateId')} value={this.state.stateId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text"  placeholder="Enter State Name" onChange={this.setValue.bind(this,'stateName')} value={this.state.stateName}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default UpdateStateMasterForm;
