import React, { Component } from 'react';
import { Segment, Header,Button,Form, Dropdown} from 'semantic-ui-react'
class VSMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vsId:'',
      vsName:'',
      districtId:'',
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

  handleVSMaster(e){
    e.preventDefault()
    const vsId = this.state.vsId.trim();
    const vsName = this.state.vsName.trim();
    const districtId = this.state.districtId.trim();

    if (vsId === '') {
      this.showSnackBar('Enter Block ID')
      return false;
    }
    if (vsName === '') {
      this.showSnackBar('Enter Block Name')
      return false;
    }
    if (districtId === '') {
      this.showSnackBar('Select District')
      return false;
    }

    const vs ={
      vsId,vsName,districtId
    }
    this.showSnackBar('')
    Meteor.call('vsMaster.insert',vs,(err,result)=>{
      if (err) {
        this.showSnackBar(err.message)
        return false;
      }
      this.showSnackBar(`${vsName} Added Successfully` )
      this.setState({vsName:'',vsId:''})
    })
  }


  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleVSMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number"  placeholder="Enter VS ID" onChange={this.setValue.bind(this,'vsId')} value={this.state.vsId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text" placeholder="Enter VS Name" onChange={this.setValue.bind(this,'vsName')} value={this.state.vsName}/>
          </Form.Field>
          <Form.Field>
            <Dropdown placeholder='Select Distict' fluid selection options={this.props.districts}  value={this.state.districtId}  onChange={(event,data)=>this.setState({districtId:data.value})}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default VSMasterForm;
