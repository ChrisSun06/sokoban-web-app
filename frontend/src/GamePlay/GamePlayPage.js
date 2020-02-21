import React from 'react';
import Data from '../hardCodedData'
import GameInterface from './GameInterface'

class GamePlayPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: undefined,
      game: undefined
    }
  }

  onAction(e){
    alert('lol')
  }

  componentDidMount(){
    this.setState({
      game: Data.sample_game
    });
  }

  render(){
    return(
      <div>
        <h1>The Game</h1><br/>
        <GameInterface game={this.state.game} 
                       usr_lst={this.state.players}
                       on_action={this.onAction.bind(this)}/>
      </div>)
  }

}

export default GamePlayPage;