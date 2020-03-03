import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import UserListContent from './../UsersList';
import ShopItem from './../ShopItemManager';
import { withStyles } from '@material-ui/core/styles';

let dummy_users = [

  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 1",
      tokens: 135,
      password: "12345"
  },
 
  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 2",
      tokens: 133,
      password: "12345"
  },
 
  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 3",
      tokens: 132,
      password: "12345"
  },
 
  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 4",
      tokens: 131,
      password: "12345"
  },
 
  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 5",
      tokens: 139,
      password: "12345"
  },
 
  {
      pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
      name: "User 6",
      tokens: 130,
      password: "12345"
  }
 ];

let dummy_products = [

  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Icon",
      price: 135,
      available: true
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Icon",
      price: 133,
      available: true
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Icon",
      price: 132,
      available: true
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Badge",
      price: 131,
      available: false
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Badge",
      price: 139,
      available: false
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Avatar",
      price: 130,
      available: true
  }
 ];

 
 

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: "inline-block",
    width: 260,
    margin: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  add_to_all: {
    padding: 10,
    display: "inline-block",
    margin: 10,
  },
  remove_all: {
    padding: 10,
    display: "inline-block",
    margin: 10,
  },
  main: {
    alignItems: 'center',
  },
  user_contents: {
  }
});

class UsersList extends React.Component {
  constructor(){
    super();
    this.addOneToAll = this.addOneToAll.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.changeAvailability = this.changeAvailability.bind(this);
    this.newProduct = this.newProduct.bind(this)
    this.findUser = this.findUser.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.inputUser = null;
    this.inputUserChange = this.inputUserChange.bind(this)
    this.editProduct = this.editProduct.bind(this)
    this.state = {
      data: dummy_users.map(function(elem) {
        return {
          name: elem.name,
          tokens: elem.tokens,
          pic: elem.pic,
        }
      }),

      products: dummy_products.map(function(elem) {
        return {
          name: elem.name,
          price: elem.price,
          pic: elem.pic,
          available: elem.available
        }
      })
    }
  }

  handleUpdate(index, title, input) {
    let tmp = this.state.data;
    if(title === "Change Tokens"){
      tmp[index].tokens = input;
      let index_to = null;
      for (let j = 0; j < dummy_users.length; j++){
        if(dummy_users[j].name == tmp[index].name){
          index_to = j;
        }
      }
      // alert(index_to)
      dummy_users[index_to].tokens = input;
      this.setState({
        data: tmp,
      });
    } else if (title === "Change Password"){
      let tmp = this.state.data;
      tmp[index].password = input;
      dummy_users[index].password = input
      this.setState({
        data: tmp,
      });
    } else {
      let tmp = this.state.data;
      let index_to = null;
      for (let j = 0; j < dummy_users.length; j++){
        if(dummy_users[j].name === tmp[index].name){
          index_to = j;
        }
      }
      if(index_to === null){
        alert("Cannot delete, user does not exist")
      }
      dummy_users.splice(index_to,1)
      tmp.splice(index,1)
      this.setState({
        data: tmp,
      });
    }
  }

  newProduct(new_name, new_price) {
    dummy_products.push({
      name: new_name,
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      price: new_price,
      available: true
    });
    let tmp = this.state.products;
    tmp.push({
      name: new_name,
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      price: new_price,
      available: true
    });
    this.setState({
      products: tmp,
    })
    console.log(this.state.products)
  }

  editProduct(index, new_name, new_price) {
    console.log(this.state.products)
    let tmp = this.state.products;
    tmp[index].name = new_name;
    tmp[index].price = new_price;
    dummy_products[index].name = new_name;
    dummy_products[index].price = new_price;
    this.setState({
      products: tmp,
    });
  }

  changeAvailability(index){
    let tmp = this.state.products;
    tmp[index].available = !tmp[index].available;
    dummy_products[index].available = tmp[index].available;
    this.setState({
        products: tmp
    });
  }


  addOneToAll(){
    let tmp = this.state.data;
    for(let i = 0; i < tmp.length; i++){
      tmp[i].tokens += 1;
      dummy_users[i].tokens += 1;
    }
    this.setState({
      data: tmp,
    });
  }

  findUser(name){
    let user = null;
    for (let i = 0; i < this.state.data.length; i++){
      if (this.state.data[i].name === name){
        user = this.state.data[i]
      }
    }

    if(user != null){
      let tmp = [user];
      this.setState({
          data: tmp
      });
    } else {
      alert("User not found!")
      let dup = dummy_users.map(function(elem) {
        return {
          name: elem.name,
          tokens: elem.tokens,
          pic: elem.pic,
        }
      })
      this.setState({
        data: dup
      });
    }
  }

  deleteAll(){
    let tmp = [];
    dummy_users = [];
    this.setState({
        data: tmp
    });
  }

  inputUserChange(e){
    this.inputUser = e.target.value
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main} align="center">
          <Paper component="form" className={classes.root} alignItems="center" justify="center">
              <InputBase
                  className={classes.input}
                  placeholder="Search People"
                  inputProps={{ 'aria-label': 'Search People' }}
                  onChange={this.inputUserChange}
              />
              <IconButton className={classes.iconButton} aria-label="search" onClick={() => this.findUser(this.inputUser)}>
                  <SearchIcon/>
              </IconButton>
          </Paper>
          <Button variant="contained" className={classes.add_to_all} onClick={() => this.addOneToAll()} alignItems="center" justify="center">Add Token To All</Button>
          <Button variant="contained" className={classes.remove_all} alignItems="center" justify="center" onClick={() => this.deleteAll()}>Remove All</Button>
          <Button variant="contained" className={classes.remove_all} alignItems="center" justify="center" onClick={() => this.newProduct("new product", 0)}>Add New Product</Button>
          <UserListContent handleUpdate={this.handleUpdate} user_data={this.state.data} alignItems="center" justify="center"/>
          <ShopItem handleUpdate={this.changeAvailability} handleEdit={this.editProduct} user_data={this.state.products} alignItems="center" justify="center"/>
      </div>
    );
  }

}

export default withStyles(styles, { withTheme: true })(UsersList);