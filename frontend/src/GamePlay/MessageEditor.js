import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';


export default function MessageEditor(props){
  function onClickSend(e){
    const value = props.input_msg;
    if(value.length > 0){
      props.on_send_msg(value);
    }
  }
  function onInput(e){
    const content = e.target.value;
    props.on_input_msg_change(content);
  }
  return (
    <Toolbar>
      
      <TextField value={props.input_msg} variant="outlined" 
                  type="text" onChange={onInput} 
                  placeholder={'say something...'}
                  multiline={true}
                  rowsMax={2}
                  size="small">
      </TextField>
      <IconButton aria-label="send" 
                  color="primary" 
                  onClick={onClickSend}
                  disabled={props.input_msg.length === 0}>
        <SendIcon/>
      </IconButton>
      
    </Toolbar>
  );
}
