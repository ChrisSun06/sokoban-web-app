import React, { Component } from "react";

import "./styles.css";

function InputField(props) {
  const fieldType = props.fieldType;
  if(fieldType === "Change Password"){
    return (
      <div>
          <input type="password" name="password"  onChange={event => props.cur_state.user_input = event.target.value}/>
      </div>
    );
  } else if (fieldType === "Delete This User?"){
    return null
  } else {
    return (
      <div>
          <input type="text" name="token" onChange={event => props.cur_state.user_input = event.target.value}/>
      </div>
    );
  }
}

//Credit 'https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57' for ideas on creating a popup window.
export default class PopUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_input: null
    }
  }

  handleClick = () => {
    this.props.toggle();
  };


  render() {
    const handleUpdate = this.props.handleUpdate;
    return (
      <div className="popup">
        <div className="popup_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>{this.props.title}</h3>
            <label>
              {this.props.content}
              <InputField fieldType={this.props.title} cur_state={this.state} />
            </label>
            <br />
            <button onClick={() => handleUpdate(this.props.index, this.props.title, parseInt(this.state.user_input))}> Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
