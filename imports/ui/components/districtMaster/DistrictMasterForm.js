import React, { Component } from 'react';
import { Segment, Header,Button,Form, Dropdown} from 'semantic-ui-react'
class DistrictMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districtId:'',
      districtName:'',
      stateId:'',
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

  handleDistrictMaster(e){
    e.preventDefault()
    const districtId = this.state.districtId.trim();
    const districtName = this.state.districtName.trim();
    const stateId = this.state.stateId.trim();

    if (districtId === '') {
      this.showSnackBar('Enter District ID')
      return false;
    }
    if (districtName === '') {
      this.showSnackBar('Enter District Name')
      return false;
    }
    if (stateId === '') {
      this.showSnackBar('Select State')
      return false;
    }

    const district ={
      districtId,districtName,stateId
    }
    this.showSnackBar('')
    Meteor.call('districtMaster.insert',district,(err,result)=>{
      if (err) {
        this.showSnackBar(err.message)
        return false;
      }
      this.showSnackBar(`${districtName} Added Successfully` )
      this.setState({districtName:'',districtId:''})
    })
  }


  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleDistrictMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number"  placeholder="Enter District ID" onChange={this.setValue.bind(this,'districtId')} value={this.state.districtId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text" placeholder="Enter District Name" onChange={this.setValue.bind(this,'districtName')} value={this.state.districtName}/>
          </Form.Field>
          <Form.Field>
            <Dropdown placeholder='Select State' fluid selection options={this.props.states}  value={this.state.stateId}  onChange={(event,data)=>this.setState({stateId:data.value})}/>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }

}

export default DistrictMasterForm;
