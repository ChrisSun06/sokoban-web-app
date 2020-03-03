import React from 'react';
// import Data from '../hardCodedData'
import GameEditInterface from './GameEditInterface'
import EditButtons from './EditButtons'
import {update_game_element, EMPTY, WALL, PLAYER, BOX, GOAL, ERASE, game_change_dim, fetch_initial_edit_game} from '../hardCodedData'
import DimPanel from './DimPanel';
import { number } from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    // this.setState({
    //   game: Data.sample_game,
    //   players: []
    // });
    fetch_initial_edit_game()
      .then((function(result){
        this.setState({
          players: result.player_lst,
          game: result.game
        })
      }).bind(this))

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

  return_home(){
    window.location.href = './profile?username=user1';
  }

  upload_game(){
    window.location.href = './profile?username=user1';
  }

  render(){
    const centered_style = {display: 'flex',  justifyContent:'center', alignItems:'center'};

    return(
      <div style={{backgroundImage: 'url(' + require('./b.jpg') + ')', backgroundSize: 'cover' , height: 900, width: "100%", overflow: "auto"}}>
        <div style={{...centered_style}}>
          <IconButton style={{float: 'left'}} onClick={this.return_home.bind(this)}>
            {/* <HomeIcon/> */}
            Quit
          </IconButton>
        </div>
        {/* <br/> */}
        <div style={{...centered_style}}>
          <h1>Game Edit</h1>
          <IconButton color='primary' onClick={this.upload_game.bind(this)}><CloudUploadIcon/></IconButton>
        </div><br/>
        <div style={{...centered_style}}>
          <EditButtons onButtonClick={this.switch_type.bind(this)}
                      currentOn={this.state.current_cursor_type}
          />
        </div><br/>
       {!!this.state.game &&
          <div style={{...centered_style}}>
            <DimPanel onDimChange={this.changeDim.bind(this)}
                    game={this.state.game}></DimPanel>

          </div>}
        <br/>
        <div style={{...centered_style}}>
          <GameEditInterface game={this.state.game}
                            usr_lst={this.state.players}
                            cell_clicked={this.cell_clicked.bind(this)}
                            //  on_action={this.onAction.bind(this)}
                            />
        </div>
      </div>)
  }


}

export default GameEditPage;
