import React, { Component } from "react";

import "./styles.css";

function InputField(props) {
  return (
    <label>
        <em>New Name</em>
        <div>
            <input type="text" name="name"  onChange={event => props.cur_state.user_input1 = event.target.value}/>
        </div>
        <em>New Price</em>
        <div>
            <input type="text" name="price"  onChange={event => props.cur_state.user_input2 = event.target.value}/>
        </div>
    </label>
  );
}

export default class PopUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_input1: null,
      user_input2: null
    }
  }

  handleClick = () => {
    this.props.toggle();
  };


  render() {
    const handleUpdate2 = this.props.handleUpdate;
    return (
      <div className="popup">
        <div className="popup_content">
          <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <form>
            <h3>{this.props.title}</h3>
            <InputField cur_state={this.state}/>
            <br />
            <button onClick={() =>  handleUpdate2(this.props.index, this.state.user_input1, parseInt(this.state.user_input2))}> Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
