import React from 'react';

export default function MessageEditor(props) {
    function onClickSend(e) {
        const value = e.target.value;
        props.on_send_msg(value);
    }

    function onInput(e) {
        const content = e.target.value;
        props.on_input_msg_change(content);
    }

    return (
        <div>
            <input value={props.input_msg} type="text" onChange={onInput}></input>
            <button onClick={onClickSend}>Send</button>
        </div>
    );
}
