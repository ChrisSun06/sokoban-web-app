import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import UserListContent from './../UsersList';
import ShopItem from './../ShopItemManager';
import GameStatus from './../gameStatus';
import { withStyles } from '@material-ui/core/styles';

import "./styles.css"

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
      name: "Badge",
      price: 131,
      available: false
  },
 
  {
      pic: "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
      name: "Avatar",
      price: 130,
      available: true
  }
 ];

 
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
    this.changeTokens = this.changeTokens.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.state = {
      data: dummy_users.map(function(elem) {
        return {
          id: undefined,
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
    this.loadUsers()
  }

  //Load in Users
  loadUsers(){
    fetch('/users', {
      method: 'GET',
      credentials: 'include',
      headers: {
      'Accept': 'application/json , text/plain',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": '*'
      }
    })
    .then(res => res.json())
    .then(res => {
      let tmp = res.docs.map(function(elem) {
        return {
          id: elem._id,
          name: elem.email,
          password: elem.password,
          tokens: elem.tokens,
          isAdmin: elem.isAdmin,
          pic: "https://cdn6.f-cdn.com/contestentries/1524490/28503850/5d1169893fa8e_thumb900.jpg",
        }
      })
      this.setState({
        data: tmp
      })
    })
    .catch(err => {
          console.error(err);
          alert('Error loading users, please try again!');
    });
  }

  //Server call that manipulate datas
  handleUpdate(index, title, input) {
    let tmp = this.state.data;
    if(title === "Change Tokens"){
      tmp[index].tokens = input;
      this.changeTokens(tmp[index].id,index, tmp[index].tokens)
    } else if (title === "Change Password"){
      let tmp = this.state.data;
      tmp[index].password = input;
      this.changePassword(tmp[index].id, input)
    
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

  changeTokens(uid, index, num) {
    let data = {
      tokens: num,
      id: uid,
      opt: "token"
    }
    // Create our request constructor with all the parameters we need
    let url = "/users"
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(request)
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  changePassword(uid, num){
    let data = {
      password: num,
      id: uid,
      opt: "password"
    }
    // Create our request constructor with all the parameters we need
    let url = "/users"
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
    });
    // Send the request with fetch()
    fetch(request)
    .then(res => res.json())
    .catch(err => console.log(err))
  }

  //Server call that sent datas
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

  //Server call that manipulate datas
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

  //Server call that manipulate datas
  changeAvailability(index){
    let tmp = this.state.products;
    tmp[index].available = !tmp[index].available;
    dummy_products[index].available = tmp[index].available;
    this.setState({
        products: tmp
    });
  }

  //Server call that manipulate datas
  addOneToAll(){
    let tmp = this.state.data;
    for(let i = 0; i < tmp.length; i++){
      this.changeTokens(tmp[i].id, i, tmp[i].tokens + 1);
    }
    window.location.reload(false);
  }

  //Server call that obtain datas
  findUser(name, event){
    event.preventDefault();
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
      this.loadUsers();
    }
  }

  //Server call that manipulate datas
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
    return (
      <div className="main">
          <Paper component="form" className="root" alignItems="center" justify="center">
              <InputBase
                  className="input"
                  placeholder="Search People"
                  inputProps={{ 'aria-label': 'Search People' }}
                  onChange={this.inputUserChange}
              />
              <IconButton type="submit" id="iconButton" aria-label="search" onClick={(e) => this.findUser(this.inputUser, e)}>
                  <SearchIcon/>
              </IconButton>
          </Paper>
          <Button variant="contained" id="add_to_all" onClick={() => this.addOneToAll()}>Add Token To All</Button>
          <Button variant="contained" id="remove_all"   onClick={() => this.deleteAll()}>Remove All Users</Button>
          <Button variant="contained" id="add_new"   onClick={() => this.newProduct("new product", 0)}>Add New Product</Button>
          <UserListContent handleUpdate={this.handleUpdate} user_data={this.state.data}/>
          <ShopItem handleUpdate={this.changeAvailability} handleEdit={this.editProduct} user_data={this.state.products}/>
          <GameStatus />
      </div>
    );
  }

}

export default UsersList;