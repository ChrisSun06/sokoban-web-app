import React from 'react';
import logo from './logo.svg';
//import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import GamePlayPage from './GamePlay/GamePlayPage'
import GameEditPage from './GameEdit/GameEditPage'
import TokenShop from './TokenShop/Shop/Shop'
import Admin from './Admin/Admin'

import Login from './Login/login'
import SignUp from './SignUp/signup'
import Profile from './Profile/profile'

function MainPage() {
  const sub_path = useParams();
  let title = 'Just to test that the router works'

  if(!!sub_path && !!sub_path.title){
    title = sub_path.title;
  }
  console.log(title);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {title}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <Router>
        <Switch>

          <Route path="./TokenShop">
            <MainPage/>
          </Route>
          {/* the above one is just a dummy page to test the router works */}

          <Route path="/gameplay">
            <GamePlayPage/>
          </Route>
          <Route path="/gameedit">
            <GameEditPage/>
          </Route>
          <Route exact path='/shop' render={() =>
            (<TokenShop state={this.state}/>)}/>
          <Route exact path='/admin' render={() =>
            (<Admin state={this.state}/>)}/>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="">
            <Login/>
          </Route>
          {/* add your own pages' path above this line */}
          // <Route exact_path=''>
          //   <MainPage/>
          // </Route>
        </Switch>
      </Router>
      );
  }
}

export default App;
