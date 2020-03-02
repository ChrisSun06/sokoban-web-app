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


const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 400
  },
  list_container: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  subside_btn: {
      margin: 10,
  },
  list_elements: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    minWidth: 400
  },
  items: {
    minWidth: 700,
    maxWidth: 1500,
  }
});

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
    let tmp = nextProps.user_data.map(function(elem) {
        return {
          name: elem.name,
          tokens: elem.tokens,
          pic: elem.pic,
          seen_pswd: false,
          seen_tkn: false,
          seen_del: false
        }
    });
    this.setState({ arr: tmp });  
  }


  render() {
    const { classes, user_data } = this.props;
    const handleUpdate2 = this.handleUpdate

    return (
      <div className={classes.root} >
        <Grid container spacing={2} alignItems="center" justify="center" className={classes.container}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.title}>
              Users
            </Typography>
            <div className={classes.list_container}>
              <List dense={this.state.dense} className={classes.list_elements}>
                  {this.state.arr.map((user, index) =>
                  <div className={classes.items}>
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
                          <IconButton edge="end" aria-label="delete" className={classes.subside_btn} onClick={() => this.togglePopDel(index)}>
                              <DeleteIcon />
                          </IconButton>
                          <Button variant="contained" color="primary" className={classes.subside_btn} onClick={() => this.togglePopPswd(index)}>
                            Change Password
                          </Button>
                          <Button variant="contained" color="primary" className={classes.subside_btn} onClick={() => this.togglePopTkn(index)}>
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

export default withStyles(styles, { withTheme: true })(UserList);



