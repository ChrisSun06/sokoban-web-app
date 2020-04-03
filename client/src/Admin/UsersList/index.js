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
import PopUp from "./PopUp";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import "./styles2.css"

class UserList extends React.Component {
  constructor(props){
    super(props);
    this.togglePopPswd = this.togglePopPswd.bind(this);
    this.togglePopTkn = this.togglePopTkn.bind(this);
    this.togglePopDel = this.togglePopDel.bind(this);
    this.state = {
      arr: this.props.user_data.map(function(elem) {
        return {
          name: elem.name,
          tokens: elem.tokens,
          pic: elem.pic,
          seen_pswd: false,
          seen_tkn: false,
          seen_del: false
        }
      }),
      
    }
  }

  togglePopPswd(index) {
    let tmp = this.state.arr;
    tmp[index].seen_pswd = !tmp[index].seen_pswd;
    this.setState({
      arr: tmp
    });
  }

  togglePopTkn(index) {
    let tmp = this.state.arr;
    tmp[index].seen_tkn = !tmp[index].seen_tkn;
    this.setState({
      arr: tmp
    });
  }

  togglePopDel(index) {
    let tmp = this.state.arr;
    tmp[index].seen_del = !tmp[index].seen_del;
    this.setState({
      arr: tmp
    });
  }

  handleUpdate(index, title, input) {
    this.props.handleUpdate(index, title, input);
  }

  componentWillReceiveProps(nextProps) {
    let tmp1 = nextProps.user_data.filter(function(elem){
        return (elem.isAdmin === false)
    })
    
    let tmp = tmp1.map(function(elem) {
      if (elem.isAdmin === false){
        return {
          name: elem.name,
          tokens: elem.tokens,
          pic: elem.pic,
          seen_pswd: false,
          seen_tkn: false,
          seen_del: false
        }
      }
    });
    this.setState({ arr: tmp });  
  }


  render() {
    const handleUpdate2 = this.handleUpdate

    return (
      <div className="root" >
        <Grid container spacing={2} className="container">
          <Grid item xs={12} md={6}>
            <Typography variant="h5">
              Users
            </Typography>
            <div className="list_container">
              <List dense={this.state.dense} className="list_elements">
                  {this.state.arr.map((user, index) =>
                  <div className="items">
                  <ListItem id={user.name}>
                      <ListItemAvatar>
                          <Avatar>
                              <Avatar src={user.pic} />
                          </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                          primary={user.name}
                          secondary={"Tokens: " + user.tokens}
                      />
                      <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" id="subside_btn1" onClick={() => this.togglePopDel(index)}>
                              <DeleteIcon />
                          </IconButton>
                          <Button variant="contained" color="primary" id="subside_btn2" onClick={() => this.togglePopPswd(index)}>
                            Change Password
                          </Button>
                          <Button variant="contained" color="primary" id="subside_btn3" onClick={() => this.togglePopTkn(index)}>
                            Change Tokens
                          </Button>
                      </ListItemSecondaryAction>
                  </ListItem>
                   {this.state.arr[index].seen_pswd ? <PopUp handleUpdate={handleUpdate2.bind(this)} title="Change Password" content="Enter new password" data={this.state.arr} index={index}  toggle={() => this.togglePopPswd(index)} /> : null}
                   {this.state.arr[index].seen_del ? <PopUp  handleUpdate={handleUpdate2.bind(this)} title="Delete This User?" content="" index={index} toggle={() => this.togglePopDel(index)} /> : null}
                   {this.state.arr[index].seen_tkn ? <PopUp handleUpdate={handleUpdate2.bind(this)} title="Change Tokens" content="Enter new amount of tokens" data={this.state.arr} index={index} toggle={() => this.togglePopTkn(index)} /> : null}
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

export default UserList;



