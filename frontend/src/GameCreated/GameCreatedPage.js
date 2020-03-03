import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";
import preview1 from "../GameLobby/sokobanpreview1.png";
import preview2 from "../GameLobby/sokobanpreview2.jpeg";
import preview3 from "../GameLobby/sokobanpreview3.jpeg";
import { CardActionArea } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const IMAGES = {
    preview1, preview2, preview3
};

function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    const on_edit_this_card = function(){
        props.on_edit(props.preview.game_id);
    }
    const on_del_this_card = function(){
        props.on_del(props.preview.game_id);
    }
    return (<Card>
        <CardHeader
            title={`${props.preview.game_name}`}
        />
        <CardContent
        >
            <img src={IMAGES[props.preview.preview_image]} height='100vh' width='100vh'></img>
        </CardContent>
        <CardActionArea>
                <IconButton aria-label="Edit" onClick={on_edit_this_card}>
                    <EditIcon/> Edit Game
                </IconButton>
                <IconButton aria-label="Delete" onClick={on_del_this_card}>
                    <DeleteIcon/> Delete Game
                </IconButton>
        </CardActionArea>
    </Card>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.player_preview.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview}
                                     on_del={props.on_del}
                                     on_edit={props.on_edit}/>
                    </Grid>)
            })}
        </Grid>)
}

class GameCreatedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            games: [
                {
                    game_name: 'Easy Game',
                    creater: {name: 'user1'},
                    preview_image: 'preview1',
                    game_id: 0
                },
                {
                    game_name: 'Strange Game',
                    creater: {name: 'user2'},
                    preview_image: 'preview2',
                    game_id: 1
                },
                {
                    game_name: 'Whatever Game',
                    creater: {name: 'user2'},
                    preview_image: 'preview3',
                    game_id: 2
                }
            ]
        };
    }

    on_del_game(id){
        this.setState({
            ...this.state,
            games: this.state.games.filter(function(itm){return itm.game_id !== id})
        })

    }

    on_edit_game(id){
        window.location.href = '/gameedit'
    }

    on_create_new(){
        window.location.href = '/gameedit'
    }

    on_quit(e){
        window.location.href = '/profile?username=user'
    }

    render() {
        return (
            <div>
                <IconButton aria-label="Create" onClick={this.on_quit.bind(this)}>
                    <ExitToAppIcon/>
                </IconButton>
                <IconButton aria-label="Create" onClick={this.on_create_new.bind(this)}>
                    <Add/> Create Game
                </IconButton>
                <LayoutList player_preview={this.state.games}
                            on_del = {this.on_del_game.bind(this)}
                            on_edit = {this.on_edit_game.bind(this)}/>
            </div>
        )
    }

}
export default GameCreatedPage