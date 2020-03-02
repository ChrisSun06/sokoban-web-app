import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Add from "@material-ui/icons/Add";


function PreviewCard(props) {
    // alert(IMAGES[props.preview.preview_image])
    return (<Card>
        <CardHeader
            title={`${props.preview.name}`}
            subheader={`${props.preview.scores}`}
        />
        <CardContent
        >
            <img src={`${props.preview.pic}`} height='100vh' width='100vh'></img>
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

class GameRoomPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [
                {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 1",
                    scores: "1000 scores"
                }, {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 2",
                    scores: "1000 scores"
                }, {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 3",
                    scores: "1000 scores"
                }, {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 4",
                    scores: "1000 scores"
                }, {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 5",
                    scores: "1000 scores"
                }, {
                    pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
                    name: "User 6",
                    scores: "1000 scores"
                }
            ]
        };
    }
    render() {
        return (
            <div>
                <LayoutList player_preview={this.state.players}/>
                <IconButton aria-label="Enter Room">
                    <Add/> Enter Room
                </IconButton>
            </div>
        )
    }

}
export default GameRoomPage