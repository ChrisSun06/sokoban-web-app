// This file is for hard coded data for phase one






// ------------------ below is data for games -------------------
//  game contains num_rows, num_cols, num_players
//  other than that, game consists of several lists:
//    goals, boxes, players, walls, 
//    goals, boxes, walls consist of objects in the form {row: ..., col: ...}
//    players consists of objects in the form {row: ..., col: ..., player_num: ...}

const sample_game = {
  num_rows: 5,
  num_cols: 5,
  // goals: [{[0, 2], [2, 0], [2, 4], [4, 2]}],
  goals: [
    { row: 0, col: 2 },
    { row: 2, col: 0 },
    { row: 2, col: 4 },
    { row: 4, col: 2 }
  ],
  boxes: [
    { row: 1, col: 2 },
    { row: 2, col: 1 },
    { row: 2, col: 3 },
    { row: 3, col: 2 },
  ],
  walls: [
    { row: 0, col: 1 },
    { row: 0, col: 3 },
    { row: 1, col: 1 },
    { row: 1, col: 3 },
    { row: 1, col: 0 },
    { row: 1, col: 4 },
    { row: 3, col: 0 },
    { row: 3, col: 1 },
    { row: 3, col: 3 },
    { row: 3, col: 4 },
    { row: 4, col: 1 },
    { row: 4, col: 3 }
  ],
  players: [
    { row: 2, col: 2, player_num: 0 }
  ]
}

// action consists of: 
//  {
//    player_num: the player that took the action
//    key: the key got pressed, has to be among W, A, S, D
//  }
// gonna do it asynchoronously for it to fit later with server, will use Proimse
// const EMPTY = 'empty';
// const WALL = 'wall';
// const PLAYER = 'player';
// const BOX = 'box';
const EMPTY = 'empty';
const WALL = 'wall';
const PLAYER = 'player';
const BOX = 'box';
const GOAL = 'goal';
const ERASE = 'delete'

const DIRECTIONS = {
  'w': [-1, 0],
  's': [1, 0],
  'a': [0, -1],
  'd': [0, 1],
  'W': [-1, 0],
  'S': [1, 0],
  'A': [0, -1],
  'D': [0, 1]
};
function next_game(game, action) {
  // copy without ref
  return new Promise(function (resolve, reject) {
    const new_game = JSON.parse(JSON.stringify(game));

    const player_num = action.player_num;
    const key = action.key;
    // console.log(new_game)
    // console.log(action);
    // console.log(player_num);
    // console.log(key);
    const plyr = new_game.players.find((player_i) => player_i.player_num === player_num);
    if (!plyr) {
      reject();
    } else {
      const move_dir = DIRECTIONS[key];
      const dr = move_dir[0];
      const dc = move_dir[1];
      const r = plyr.row;
      const c = plyr.col;
      const rn = r + dr;
      const cn = c + dc;
      const type_n = coord_type(game, rn, cn);
      let can_move = true;
      // console.log(type_n);
      if ([PLAYER, WALL].includes(type_n)) {
        can_move = false;
      } else if ([BOX].includes(type_n)) {
        const rnn = rn + dr;
        const cnn = cn + dc;
        const type_nn = coord_type(game, rnn, cnn);
        if ([BOX, PLAYER, WALL].includes(type_nn)) {
          can_move = false;
        }
      }
      // else{
      //   // empty
      //   can_move = true;
      // }
      if (!can_move) {
        // return new_game;
        reject();
      } else {
        // console.log('finally moving');
        // console.log(new_game)
        if (type_n === BOX) {
          const boxn = new_game.boxes.find((bx) => bx.row === rn && bx.col === cn);
          boxn.row = rn + dr;
          boxn.col = cn + dc;
        }
        plyr.row = rn;
        plyr.col = cn;
        // console.log(new_game)
        // resolve(game_end(new_game), JSON.stringify(new_game));
        resolve({ game_end: game_end(new_game), new_game: new_game });
      }
    }

  });

}

function game_end(game) {
  return game.boxes.reduce(function (prev, cur) {
    return prev && on_goal(game, cur.row, cur.col);
  }, true);
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

// return one of:
//    EMPTY, WALL, PLAYER, BOX, it ignores if it is goal or not because it 
//    is only for whether the direction is movable
function coord_type(game, r, c) {
  if (r >= game.num_rows || c >= game.numcols || r < 0 || c < 0) {
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
  }

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
      new_game.goals.push({ row: row, col: col });
      updated = true;
    }
  } else if (type === WALL) {
    if (!original_is_on_goal && original_type === EMPTY) {
      new_game.walls.push({ row: row, col: col });
      updated = true;
    }
  } else if (type === PLAYER) {
    if (original_type === EMPTY) {
      const new_player_num = new_game.players.length;
      new_game.players.push({ row: row, col: col, player_num: new_player_num });
      updated = true;
    }
  } else if (type === BOX) {
    // BOX
    if (original_type === EMPTY) {
      new_game.boxes.push({ row: row, col: col });
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


module.exports = {
  sample_game: sample_game,
  on_goal: on_goal,
  next_game: next_game,
  EMPTY: EMPTY,
  WALL: WALL,
  PLAYER: PLAYER,
  BOX: BOX,
  GOAL: GOAL,
  ERASE: ERASE,
  update_game_element: update_game_element
}

