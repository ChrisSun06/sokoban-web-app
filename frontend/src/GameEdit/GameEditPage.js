import React from 'react';
import Data from '../hardCodedData'
import GameEditInterface from './GameEditInterface'
import EditButtons from './EditButtons'
import {update_game_element, EMPTY, WALL, PLAYER, BOX, GOAL, ERASE, game_change_dim} from '../hardCodedData'
import DimPanel from './DimPanel';

class GameEditPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      players: undefined,
      game: undefined,
      // part of hardcode, should instead fetch the player number
      player_num: 0,
      allow_edit: true,
      current_cursor_type: undefined
    }
  }

  componentDidMount(){
    this.setState({
      game: Data.sample_game,
      players: []
    });
  }

  cell_clicked(coord){
    // alert(JSON.stringify(coord));
    const {row, col} = coord;
    if(this.state.allow_edit && this.state.current_cursor_type !== EMPTY){
      this.setState({allow_edit: false});
      update_game_element(this.state.game, row, col, this.state.current_cursor_type)
        .then(
            (function(result){
            const {updated, new_game} = result;
            if(updated){
              this.setState({allow_edit: true, game: new_game})
            }else{
              this.setState({allow_edit: true});
            }
          }).bind(this)
        );
    }
  }

  switch_type(type){
    if(type === this.state.current_cursor_type){
      this.setState({current_cursor_type: EMPTY})
    }else{
      this.setState({current_cursor_type: type})
    }
    
  }
  
  changeDim(dims){
    game_change_dim(this.state.game, dims)
      .then((function(result){
          this.setState({game: result.game})
        }).bind(this)
      );

  }

  render(){
    return(
      <div>
        <h1>The Game</h1><br/>
        <EditButtons onButtonClick={this.switch_type.bind(this)}
                     currentOn={this.state.current_cursor_type}
        />
        <DimPanel onDimChange={this.changeDim.bind(this)}></DimPanel>
        <GameEditInterface game={this.state.game} 
                           usr_lst={this.state.players}
                           cell_clicked={this.cell_clicked.bind(this)}
                          //  on_action={this.onAction.bind(this)}
                           />
      </div>)
  }


}

export default GameEditPage;