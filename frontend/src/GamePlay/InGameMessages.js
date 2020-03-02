import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';


function single_message_display(msg){
  return (
    <div>
      <Typography color="primary" variant="caption">
        {`player ${msg.sender_number}: `}
      </Typography>
      <Typography color="secondary" variant="caption" style={{marginLeft: '5px'}}>
        {`${msg.content}`}
      </Typography>
    </div>)
}

export default function InGameMessages(props){
  // alert(JSON.stringify(props));
  return (
    <Card style={{height: '30vh', overflow: 'auto'}}>
      {!!props.messages && props.messages.map(single_message_display)}
    </Card>
  );
}
