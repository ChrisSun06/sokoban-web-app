import React from 'react';
import { number } from 'prop-types';

class DimPanel extends React.Component{
  // constructor(props){
  //   super(props);
  //   // this.state = {
  //   //   // just a default dummy value
  //   //   num_rows: 3,
  //   //   num_cols: 3
  //   // }
  // }

 

  onInput(value, target){
    const n = parseInt(value);
    const dims = {
      num_rows: this.props.game.num_rows,
      num_cols: this.props.game.num_cols
    }
    if(n >=1){
      // this.setState({[target]: n}, function(){
      //   this.props.onDimChange(this.state);
      // });
      dims[target] = n;
      this.props.onDimChange(dims);
    }
    
  }


  render(){
    // alert(JSON.stringify(this.props.game))
    return (<div>
      <input type='range' min="1" max="20" value={this.props.game.num_rows} onChange={
        (function(e){
          this.onInput(e.target.value, 'num_rows');
        }).bind(this)
      }></input>
      <label>{`${this.props.game.num_rows} rows`}</label>
      <br/>
      <input type='range' min="1" max="20" value={this.props.game.num_cols} onChange={
        (function(e){
          this.onInput(e.target.value, 'num_cols');
        }).bind(this)
      }></input>
      <label>{`${this.props.game.num_cols} columns`}</label>
    </div>)
  }
}

export default DimPanel
