import React from 'react';

function single_message_display(msg) {
    return (<div>{`player ${msg.sender_number}: ${msg.content}`}</div>)
}

export default function InGameMessages(props) {
    // alert(JSON.stringify(props));
    return (
        <div>
            {!!props.messages && props.messages.map(single_message_display)}
        </div>
    );
}
