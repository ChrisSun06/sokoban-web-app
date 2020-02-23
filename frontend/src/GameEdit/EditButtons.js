import React from 'react';
import {EMPTY, WALL, PLAYER, BOX, GOAL, ERASE} from '../hardCodedData'
// import {EMPTY, WALL, PLAYER, BOX, GOAL, ERASE} from './constants';

class EditButtons extends React.Component{
  constructor(props){
    super(props);
  }
  create_button(obj_type){
    let color = 'white';
    if(obj_type === this.props.currentOn){
      color='blue';
    }
    return (
      <button onClick={(function(e){this.props.onButtonClick(obj_type)}).bind(this)}
              style={{backgroundColor: color}}
        >
        {obj_type.toUpperCase()}
      </button>);
  }

  render(){
    return (
      <div>
        <ul display='inline'>
          {[WALL, PLAYER, BOX, GOAL, ERASE].map((function(obj_type){
              return (<li display='inline'>{this.create_button(obj_type)}</li>);
          }).bind(this))}
        </ul>
      </div>
    );
  }
}
export default EditButtons;
