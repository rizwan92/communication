import React, { Component } from 'react';
import { Segment, Header,Button,Form} from 'semantic-ui-react'

class StateMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateId:'',
      stateName:'',
      error:'',
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

    const state ={
      stateId,stateName
    }
    this.showSnackBar('')
    Meteor.call('stateMaster.insert',state,(err,result)=>{
      if (err) {
        this.showSnackBar(err.message)
        return false;
      }
      this.showSnackBar(`${stateName} Added Successfully` )
      this.setState({stateName:'',stateId:''})
    })
  }


  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleStateMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number"  placeholder="Enter State ID" onChange={this.setValue.bind(this,'stateId')} value={this.state.stateId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text" placeholder="Enter State Name" onChange={this.setValue.bind(this,'stateName')} value={this.state.stateName}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default StateMasterForm;
