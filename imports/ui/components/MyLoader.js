import React from 'react';
import { Segment, Image, Loader, Dimmer} from 'semantic-ui-react'
const MyLoader =()=>{
  return(
    <Segment style={{position:'fixed',top:20, bottom:0, right:0,left:0}}>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>
      <Image src='/assets/images/wireframe/short-paragraph.png' />
    </Segment>
  )
}
export default MyLoader;
