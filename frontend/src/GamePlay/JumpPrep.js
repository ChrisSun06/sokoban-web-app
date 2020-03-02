import React from 'react';


const tail_transition = {
  0: '.',
  1: '..',
  2: '...',
  3: ''
}

const tail_update_interval = 500;


class JumpPrep extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tail: '.'
    }
    setInterval((function(){
      this.setState(
        {tail: tail_transition[this.state.tail.length]}
      );
    }).bind(this), tail_update_interval);
  }

  render(){
    return (
      <h4 style={{color: 'grey'}}>
        {`${this.props.msg}${this.state.tail}`}
      </h4>);
  }

}

export default JumpPrep;