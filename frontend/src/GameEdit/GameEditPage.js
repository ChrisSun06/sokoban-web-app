import React from 'react';
// import Data from '../hardCodedData'
import GameEditInterface from './GameEditInterface'
import EditButtons from './EditButtons'

import DimPanel from './DimPanel';
import { number } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import "./styles.css"

const EMPTY = 'empty';
const WALL = 'wall';
const PLAYER = 'player';
const BOX = 'box';
const GOAL = 'goal';
const ERASE = 'delete';

const styles = theme => ({
  root: {display: 'flex',  justifyContent:'center', alignItems:'center'}
});

function fetch_initial_edit_game(...args) {
  // promise to simulate asynchrononess, return empty 6 by 6 board
  return new Promise(function (resolve, reject) {
      const empty_game = {
          num_rows: 6,
          num_cols: 6,
          goals: [],
          walls: [],
          boxes: [],
          players: []
      };
      resolve({game: empty_game, player_lst: []})
  });
}

// type among WALL, PLAYER, ERASE, BOX, GOAL
function update_game_element(game, row, col, type) {
  // original type among EMPTY, WALL, PLAYER, BOX
  const original_type = coord_type(game, row, col);
  const original_is_on_goal = on_goal(game, row, col);

  const type_to_list_key = {
      [WALL]: 'walls',
      [PLAYER]: 'players',
      [BOX]: 'boxes',
      [GOAL]: 'goals'
  };

  const new_game = JSON.parse(JSON.stringify(game));
  let updated = false;
  if (type === ERASE) {
      if (original_type !== EMPTY) {
          // console.log(original_type);
          // console.log(type_to_list_key[original_type]);
          // console.log(type_to_list_key);
          new_game[type_to_list_key[original_type]] = new_game[type_to_list_key[original_type]].filter(
              (itm) => itm.row !== row || itm.col !== col
          );
          updated = true;
      }
      if (original_is_on_goal) {
          new_game.goals = new_game.goals.filter((itm) => itm.row !== row || itm.col !== col);
          updated = true;
      }
  } else if (type === GOAL) {
      if (original_type !== WALL && !original_is_on_goal) {
          new_game.goals.push({row: row, col: col});
          updated = true;
      }
  } else if (type === WALL) {
      if (!original_is_on_goal && original_type === EMPTY) {
          new_game.walls.push({row: row, col: col});
          updated = true;
      }
  } else if (type === PLAYER) {
      if (original_type === EMPTY) {
          const new_player_num = new_game.players.length;
          new_game.players.push({row: row, col: col, player_num: new_player_num});
          updated = true;
      }
  } else if (type === BOX) {
      // BOX
      if (original_type === EMPTY) {
          new_game.boxes.push({row: row, col: col});
          updated = true;
      }
  }

  // Promisify to mimic asynchronouness, but might consider doing it locally...
  return new Promise(function (resolve, reject) {
      resolve({
          new_game: new_game,
          updated: updated
      });
  });

}

function coord_type(game, r, c) {
  if (r >= game.num_rows || c >= game.num_cols || r < 0 || c < 0) {
      return WALL;
  } else if (
      game.walls.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return WALL;
  } else if (
      game.boxes.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return BOX;
  } else if (
      game.players.reduce((prev, cur) => {
          if (r === cur.row && c === cur.col) {
              return true;
          } else {
              return prev;
          }
      }, false)
  ) {
      return PLAYER;
  } else {
      return EMPTY;
  }

}

function on_goal(game, x, y) {
  return game.goals.reduce(function (prev, cur) {
      if (cur.row === x && cur.col === y) {
          return true;
      } else {
          return prev;
      }
  }, false);
}

function game_change_dim(game, new_dim) {
  // promisify to simulate asynchrousness
  // alert(JSON.stringify(new_dim))
  const new_game = JSON.parse(JSON.stringify(game));
  new_game.num_rows = new_dim.num_rows;
  new_game.num_cols = new_dim.num_cols;
  return new Promise(function (resolve, reject) {
      resolve({game: new_game});
  });
}

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
