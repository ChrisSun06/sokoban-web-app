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


const IMAGES = {
    preview1, preview2, preview3
};

function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    return (<Card>
        <CardHeader
            title={`${props.preview.game_name}`}
        />
        <CardContent
        >
            <img src={IMAGES[props.preview.preview_image]} height='100vh' width='100vh'></img>
        </CardContent>
    </Card>)
}

function LayoutList(props) {
    return (
        <Grid container spacing={24}>
            {props.player_preview.map(function (preview) {
                return (
                    <Grid md={3}>
                        <PreviewCard preview={preview}/>
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
    render() {
        return (
            <div>
                <IconButton aria-label="Enter Room">
                    <Add/> Create Game
                </IconButton>
                <IconButton aria-label="Enter Room">
                    <Add/> Edit Game
                </IconButton>
                <IconButton aria-label="Enter Room">
                    <Add/> Delete Game
                </IconButton>
                <LayoutList player_preview={this.state.games}/>
            </div>
        )
    }

}
export default GameCreatedPage