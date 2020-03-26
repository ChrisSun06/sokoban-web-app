import React from 'react';
import InGameMessages from './InGameMessages'
import MessageEditor from './MessageEditor'

export default class InGameChatBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br/>
                <br/>
                <MessageEditor on_send_msg={this.props.on_send_msg} input_msg={this.props.input_msg}
                               on_input_msg_change={this.props.on_input_msg_change}/>
                <br/>
                <InGameMessages messages={this.props.messages}/>
            </div>
        );
    }


}
