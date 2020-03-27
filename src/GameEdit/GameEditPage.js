import React from 'react';
// import Data from '../hardCodedData'
import GameEditInterface from './GameEditInterface'
import EditButtons from './EditButtons'
import {update_game_element, EMPTY, WALL, PLAYER, BOX, GOAL, ERASE, game_change_dim, fetch_initial_edit_game} from '../hardCodedData'
import DimPanel from './DimPanel';
import { number } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import "./styles.css"

const styles = theme => ({
  root: {display: 'flex',  justifyContent:'center', alignItems:'center'}
});

class GameEditPage extends React.Component{
  constructor(props){
    super(props);
    this.onInfoo = this.onInfoo.bind(this)
    this.state = {
      players: undefined,
      game: undefined,
      // part of hardcode, should instead fetch the player number
      player_num: 0,
      allow_edit: true,
      current_cursor_type: undefined
    }
  }

  onInfoo(){
    fetch("http://localhost:5000/users/getInfo", {
        method: 'GET',
        redirect: 'follow',
        credentials: 'include',
        headers: {
            'Accept': 'application/json , text/plain',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": 'http://localhost:3000'
        }
    }).then(res => res.text())
    .then(res => this.setState({players: res}));
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
    this.onInfoo();
    console.log(this.state.players)
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
    const url = 'http://localhost:5000/users/newGame';

    // The data we are going to send in our request
    let data = {
      game_name: "a1",
      creater: this.state.players,
      num_rows: this.state.game.num_rows,
      num_cols: this.state.game.num_cols,
      goals: this.state.game.goals,
      boxes: this.state.game.boxes,
      walls: 
        this.state.game.walls,
      players: this.state.game.players
    }
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status == 400) {
            // If student was added successfully, tell the user.
            alert('Upload Failed')
        
        } else {
            alert('Upload Succeeed')
            console.log(res)
        }
    }).catch((error) => {
        console.log(error)
    })
    window.location.href = './profile?username=user1';
  }

  render(){

    return(
      <div id="background">
        <div className="root">
          <IconButton style={{float: 'left'}} onClick={this.return_home.bind(this)}>
            {/* <HomeIcon/> */}
            Quit
          </IconButton>
        </div>
        {/* <br/> */}
        <div className="root">
          <h1>Game Edit</h1>
          <IconButton color='primary' onClick={this.upload_game.bind(this)}><CloudUploadIcon/></IconButton>
        </div><br/>
        <div className="root" >
          <EditButtons onButtonClick={this.switch_type.bind(this)}
                      currentOn={this.state.current_cursor_type}
          />
        </div><br/>
       {!!this.state.game &&
          <div className="root">
            <DimPanel onDimChange={this.changeDim.bind(this)}
                    game={this.state.game}></DimPanel>

          </div>}
        <br/>
        <div className="root">
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