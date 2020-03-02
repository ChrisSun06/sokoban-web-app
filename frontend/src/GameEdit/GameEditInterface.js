import React from 'react';
import {pi, floor} from 'mathjs';
import {on_goal} from '../hardCodedData';

const WHITE = '#FFFFFF';
const BLACK = '#000000';
const DARK_BLUE = '#144DDE';
const RED = '#F5190A';
const GREEN = '#22FF00';
const GREY = "#404040";

// note that coord system of canvas is x from left to right, y from up to down, thus it is transposed
//  of our representation

// const game_width = 300;
// const game_height = 200;
const cell_size = 50;
const w_rec = cell_size;
const h_rec = cell_size;
const r_small = 5;
const sign_font = 'Arial';
const sign_base_size = 100;

class GameEditInterface extends React.Component {
    componentDidUpdate() {
        if (!this.props.game) {
            return;
        }
        const canvas = this.refs.canvas;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext("2d");
        const user_lst = this.props.usr_lst;
        // const on_action = this.state.on_action;
        const game = this.props.game;
        // const rws = game.layout.length;
        // const cls = game.layout[0].length;
        // for(let cx = 0; cx < rws; cx++){
        //   for(let cy=0; cy<cls; cy++){
        //     CellDisplay(cx, cy, user_lst, ctx, game);
        //   }
        // }
        draw_game_board(ctx, game, user_lst);
    }

    on_interface_click(e) {
        // alert(Object.keys(e))
        const canvas = this.refs.canvas;
        const rect = canvas.getBoundingClientRect();
        const x_click = e.clientX;
        const y_click = e.clientY;
        const x = x_click - rect.x;
        const y = y_click - rect.y;

        const coord = find_click_coord(this.props.game, x, y);
        this.props.cell_clicked(coord);
    }

    render() {
        return (
            <div>
                {!!this.props.game && <canvas ref="canvas" height={this.props.game.num_rows * h_rec}
                                              width={this.props.game.num_cols * w_rec} tabIndex='0'
                                              onClick={this.on_interface_click.bind(this)}/>}
            </div>
        )
    }
}

function draw_game_board(ctx, game, user_lst) {
    // const w_rec = game_width / game.num_cols;
    // const h_rec = game_height / game.num_rows;
    // ctx.fillStyle = WHITE;
    // ctx.fillRect(0, 0, width, height);
    for (let ri = 0; ri < game.num_rows; ri++) {
        for (let ci = 0; ci < game.num_cols; ci++) {
            draw_null(game, user_lst, w_rec, h_rec, ctx, ri, ci);
        }
    }

    game.walls.forEach(function (coord) {
        draw_wall(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
    });
    game.boxes.forEach(function (coord) {
        draw_box(game, user_lst, w_rec, h_rec, ctx, coord.row, coord.col);
    });
    game.players.forEach(function (p) {
        draw_player(game, user_lst, w_rec, h_rec, ctx, p.row, p.col, p.player_num);
    });

}

function coordInRange(game, r, c) {
    // let in_range = true;
    const n_rows = game.num_rows;
    const n_cols = game.num_cols;
    // if(r < 0 || r>=n_rows)
    return (r < n_rows && r >= 0 && c >= 0 && c < n_cols);
}

function draw_wall(game, user_lst, w_rec, h_rec, ctx, r, c) {
    // const on_goal = on_goal(game, r, c);
    if (!coordInRange(game, r, c)) {
        return;
    }
    const x = c * w_rec;
    const y = r * h_rec;
    const xn = x + w_rec;
    const yn = y + h_rec;
    ctx.fillStyle = BLACK;
    ctx.fillRect(x, y, w_rec, h_rec);
    // ctx.fillStyle=undefined;
    // console.log(r, c, x, y, xn, yn)
    // assume wall never on goal

}

function draw_null(game, user_lst, w_rec, h_rec, ctx, r, c) {
    if (!coordInRange(game, r, c)) {
        return;
    }
    const is_on_goal = on_goal(game, r, c);
    const x = c * w_rec;
    const y = r * h_rec;
    const xn = x + w_rec;
    const yn = y + h_rec;
    const xc = (x + xn) / 2;
    const yc = (y + yn) / 2;
    ctx.fillStyle = WHITE;
    ctx.fillRect(x, y, w_rec, h_rec);
    ctx.strokeStyle = GREY;
    ctx.strokeRect(x, y, w_rec, h_rec);

    const game_width = game.num_cols * w_rec;
    const game_height = game.num_rows * h_rec;
    if (is_on_goal) {
        ctx.fillStyle = GREEN;
        ctx.beginPath();
        ctx.arc(xc, yc, r_small, 0, 2 * pi);
        ctx.fill();
    } else {
        let this_font_size = w_rec * sign_base_size / game_width;
        if (h_rec * sign_base_size / game_height < this_font_size) {
            this_font_size = h_rec * sign_base_size / game_height;
        }
        ctx.fillStyle = GREY;
        ctx.font = `${this_font_size}px ${sign_font}`;
        // console.log(this_font_size);
        ctx.fillText("+", 0.75 * xc + 0.25 * x, 0.75 * yc + 0.25 * yn);
    }


}

function draw_box(game, user_lst, w_rec, h_rec, ctx, r, c) {
    if (!coordInRange(game, r, c)) {
        return;
    }
    const is_on_goal = on_goal(game, r, c);
    const x = c * w_rec;
    const y = r * h_rec;
    const xn = x + w_rec;
    const yn = y + h_rec;
    ctx.fillStyle = DARK_BLUE;
    ctx.fillRect(x, y, w_rec, h_rec);
    if (is_on_goal) {
        const xc = (x + xn) / 2;
        const yc = (y + yn) / 2;
        ctx.fillStyle = GREEN;
        ctx.beginPath();
        ctx.arc(xc, yc, r_small, 0, 2 * pi);
        ctx.fill();
    }
}

function draw_player(game, user_lst, w_rec, h_rec, ctx, r, c, player_num) {
    if (!coordInRange(game, r, c)) {
        return;
    }
    // should render based on player number but ignore it for now
    const is_on_goal = on_goal(game, r, c);
    const x = c * w_rec;
    const y = r * h_rec;
    const xn = x + w_rec;
    const yn = y + h_rec;
    const xc = (x + xn) / 2;
    const yc = (y + yn) / 2;
    // take min
    const r_player = [xc - x, yc - y].reduce(function (prev, cur) {
        if (!prev || cur < prev) {
            return cur;
        } else {
            return prev;
        }
    }, undefined);

    ctx.fillStyle = RED;
    ctx.beginPath();
    ctx.arc(xc, yc, r_player, 0, 2 * pi);
    ctx.fill();

    if (is_on_goal) {
        ctx.fillStyle = GREEN;
        ctx.beginPath();
        ctx.arc(xc, yc, r_small, 0, 2 * pi);
        ctx.fill();
    }
}

function find_click_coord(game, x, y) {
    // const w_rec = game_width / game.num_cols;
    // const h_rec = game_height / game.num_rows;
    const col = floor(x / w_rec);
    const row = floor(y / h_rec);
    return {
        row: row,
        col: col
    };
}


export default GameEditInterface;