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


const styles = theme => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    alignSelf: 'center',
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
  items: {
    minWidth: 700,
    maxWidth: 1500,
  }
});

class ShopItem extends React.Component {
  constructor(props){
    super(props);
    this.togglePopPswd = this.togglePopPswd.bind(this);
    this.togglePopTkn = this.togglePopTkn.bind(this);
    this.togglePopDel = this.togglePopDel.bind(this);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.state = {
      arr: this.props.user_data.map(function(elem) {
        return {
          name: elem.name,
          price: elem.price,
          pic: elem.pic,
          available: elem.available,
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
          price: elem.price,
          available: elem.available,
          seen_del: false
        }
    });
    this.setState({ arr: tmp });  
  }

  //
  changeAvailability(index){
    this.props.handleUpdate(index);
  }


  render() {
    const { classes, user_data } = this.props;
    const handleUpdate2 = this.handleUpdate

    return (
      <div className={classes.root} >
        <Grid container spacing={2} alignItems="center" justify="center" >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" className={classes.title}>
              Products
            </Typography>
            <div className={classes.list_container}>
              <List dense={this.state.dense} className={classes.list_elements}>
                  {this.state.arr.map((user, index) =>
                  <div className={classes.items} >
                  <ListItem id={user.name}>
                      <ListItemAvatar>
                          <Avatar>
                              <Avatar src={user.pic} />
                          </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                          primary={user.name}
                          secondary={"Price: " + user.price}
                      />
                      <ListItemSecondaryAction>
                          <Button variant="contained" color="primary" className={classes.subside_btn} onClick={() => this.changeAvailability(index)}>
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

export default withStyles(styles, { withTheme: true })(ShopItem);



