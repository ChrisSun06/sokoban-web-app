import React from 'react';


import "./styles.css"


const tail_transition = {
  0: '.',
  1: '..',
  2: '...',
  3: ''
}

const tail_update_interval = 500;


class WaitingText extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tail: '.'
    }

    let interval = tail_update_interval;
    if(!!props.interval){
      interval = props.interval
    }
    setInterval((function(){
      this.setState(
        {tail: tail_transition[this.state.tail.length]}
      );
    }).bind(this), interval);
  }

  render(){
    let text_color = 'grey';
    if(!!this.props.color){
      text_color = this.props.color;
    }
    return (
      <h4 id="msg">
        {`${this.props.msg}${this.state.tail}`}
      </h4>);
  }

}

export default WaitingText;