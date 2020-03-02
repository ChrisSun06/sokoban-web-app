import React, { Component } from "react";

import "./styles.css";

function InputField(props) {
  const fieldType = props.fieldType;
  if(fieldType === "Change Password"){
    return (
      <div>
          <input type="password" name="password"  />
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
      <div className="modal">
        <div className="modal_content">
          <span className="close">
            &times;
          </span>
          <form>
            <h3>{this.props.title}</h3>
            <label>
              {this.props.content}
              <InputField fieldType={this.props.title} cur_state={this.state} />
            </label>
            <br />
            <input type="submit" onClick={() => handleUpdate(this.props.index, this.props.title, parseInt(this.state.user_input))}/>
          </form>
        </div>
      </div>
    );
  }
}
