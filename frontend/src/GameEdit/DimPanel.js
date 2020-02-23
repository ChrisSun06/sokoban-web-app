import React from 'react';
import { number } from 'prop-types';

class DimPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      num_rows: 5,
      num_cols: 5
    }
  }

  onInput(value, target){
    const n = parseInt(value);
    if(n >=1){
      this.setState({[target]: n}, function(){
        this.props.onDimChange(this.state);
      });
    }
    
  }

  render(){
    return (<div>
      <input type='range' min="1" max="20" value={this.state.num_rows} onChange={
        (function(e){
          this.onInput(e.target.value, 'num_rows');
        }).bind(this)
      }></input>
      <label>{`${this.state.num_rows} rows`}</label>
      <br/>
      <input type='range' min="1" max="20" value={this.state.num_cols} onChange={
        (function(e){
          this.onInput(e.target.value, 'num_cols');
        }).bind(this)
      }></input>
      <label>{`${this.state.num_cols} columns`}</label>
    </div>)
  }
}

export default DimPanel
