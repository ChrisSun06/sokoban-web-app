import React from 'react';
import Data from '../hardCodedData'
import GameInterface from './GameInterface'
import {next_game} from '../hardCodedData'

class GamePlayPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: undefined,
      game: undefined,
      // part of hardcode, should instead fetch the player number
      player_num: 0,
      allow_action: true
    }
  }

  onAction(e){
    if(this.state.allow_action){
      const key = e.key;
      if('wasdWASD'.includes(key)){
        this.setState({allow_action: false});
        next_game(this.state.game, {player_num: this.state.player_num, key: key})
          .then((function(result){
            // console.log('next game!')
            // console.log(game_end, new_game);
            const new_game = result.new_game;
            const game_end = result.game_end;
            
            this.setState({game: new_game, allow_action: true});
            if(game_end){
              alert('end of game!');
              this.setState({allow_action: false});
            }
          }).bind(this))
          .catch((function(){
            this.setState({allow_action: true})
          }).bind(this));
      }
    }
    
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