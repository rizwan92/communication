import React, { Component } from 'react';
import { Segment, Header,Button,Form, Dropdown} from 'semantic-ui-react'
class BlockMasterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockId:'',
      blockName:'',
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

  handleBlockMaster(e){
    e.preventDefault()
    const blockId = this.state.blockId.trim();
    const blockName = this.state.blockName.trim();
    const districtId = this.state.districtId.trim();

    if (blockId === '') {
      this.showSnackBar('Enter Block ID')
      return false;
    }
    if (blockName === '') {
      this.showSnackBar('Enter Block Name')
      return false;
    }
    if (districtId === '') {
      this.showSnackBar('Select District')
      return false;
    }

    const district ={
      blockId,blockName,districtId
    }
    this.showSnackBar('')
    Meteor.call('blockMaster.insert',district,(err,result)=>{
      if (err) {
        this.showSnackBar(err.message)
        return false;
      }
      this.showSnackBar(`${blockName} Added Successfully` )
      this.setState({blockName:'',blockId:''})
    })
  }


  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleBlockMaster.bind(this)} style={{width:'60%'}}>
          <Header as='h3' style={{color:'red'}}>{this.state.error === '' ?  '' : this.state.error}</Header>
          <Form.Field >
            <input  type="number"  placeholder="Enter Block ID" onChange={this.setValue.bind(this,'blockId')} value={this.state.blockId}/>
          </Form.Field>
          <Form.Field >
            <input  type="text" placeholder="Enter Block Name" onChange={this.setValue.bind(this,'blockName')} value={this.state.blockName}/>
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

export default BlockMasterForm;
