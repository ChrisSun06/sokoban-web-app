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
import PopUp from './PopUp.js';

import "./styles2.css"


class ShopItem extends React.Component {
  constructor(props){
    super(props);
    this.togglePopEdit = this.togglePopEdit.bind(this);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.editProduct = this.editProduct.bind(this)
    this.state = {
      arr: this.props.user_data.map(function(elem) {
        return {
          name: elem.name,
          price: elem.price,
          pic: elem.pic,
          available: elem.available,
          seen_edit: false
        }
      }),
    }
  }


  togglePopEdit(index) {
    let tmp = this.state.arr;
    tmp[index].seen_edit = !tmp[index].seen_edit;
    this.setState({
      arr: tmp
    });
  }

  componentWillReceiveProps(nextProps) {
    let tmp = nextProps.user_data.map(function(elem) {
        return {
          name: elem.name,
          price: elem.price,
          pic: elem.pic,
          available: elem.available,
          seen_edit: false
        }
    });
    this.setState({ arr: tmp });  
  }

  changeAvailability(index){
    this.props.handleUpdate(index);
  }

  editProduct(index, name, price){
    this.props.handleEdit(index, name, price);
  }


  render() {
    const editProduct = this.editProduct;

    return (
      <div className="root" >
        <Grid container spacing={2} >
          <Grid item xs={12} md={6}>
            <Typography variant="h5">
              Products
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
                          secondary={"Price: " + user.price}
                      />
                      <ListItemSecondaryAction>
                          <Button variant="contained" color="primary" id="subside_btn" onClick={() => this.changeAvailability(index)}>
                          {user.available ? (
                            <span>Make Unavailable</span>
                            ) : (
                                <span>Make Available</span>
                            )}
                          </Button>
                          <Button variant="contained" color="primary" id="subside_btn2" onClick={() => this.togglePopEdit(index)}>
                            Edit
                          </Button>
                      </ListItemSecondaryAction>
                      {this.state.arr[index].seen_edit ? <PopUp  handleUpdate={editProduct.bind(this)} title="Edit Product" index={index} toggle={() => this.togglePopEdit(index)} /> : null}
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

export default ShopItem;



