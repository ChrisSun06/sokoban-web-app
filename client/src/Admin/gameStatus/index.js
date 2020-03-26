import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';
import preview1 from './sokobanpreview1.png'
import preview2 from './sokobanpreview2.jpeg'
import preview3 from './sokobanpreview3.jpeg'


import "./styles.css"

let dummy_games = [

    {
        pic: preview1,
        name: "Easy Game",
        available: true
    },
   
    {
        pic: preview2,
        name: "Strange Game",
        available: true
    },
   
    {
        pic: preview3,
        name: "Whatever Game",
        available: true
    }
   ];


class gameStatus extends React.Component {
  constructor(props){
    super(props);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.state = {
      arr: dummy_games.map(function(elem) {
        return {
          name: elem.name,
          pic: elem.pic,
          available: elem.available,
          seen_edit: false
        }
      }),
    }
  }



  //Server call that manipulate datas
  changeAvailability(index){
    let tmp = this.state.arr
    tmp[index].available = !tmp[index].available
    this.setState({ arr: tmp })
  }


  render() {

    return (
      <div className="root" >
        <Grid container spacing={2} >
          <Grid item xs={12} md={6}>
            <Typography variant="h5">
              Active Games
            </Typography>
            <div className="list_container">
              <List dense={this.state.dense} className="list_elements">
                  {this.state.arr.map((user, index) =>
                  <div className="items" >
                  <ListItem id={user.name}>
                      <ListItemAvatar>
                          <Avatar>
                              <Avatar src={user.pic} />
                          </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                          primary={user.name}
                      />
                      <ListItemSecondaryAction>
                          <Button variant="contained" color="primary" id="subside_btn" onClick={() => this.changeAvailability(index)}>
                          {user.available ? (
                            <span>Make Unavailable</span>
                            ) : (
                                <span>Make Available</span>
                            )}
                          </Button>
                      </ListItemSecondaryAction>
                  </ListItem>
                  </div>
                  )}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default gameStatus;



