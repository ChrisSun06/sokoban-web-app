import React from 'react';
import logo from './logo.svg';
//import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom";

import GamePlayPage from './GamePlay/GamePlayPage'
import GameEditPage from './GameEdit/GameEditPage'
import LayoutLobby from './GameLobby/LayoutLobby'
import GameRoomPage from './GameRoom/GameRoomPage'

import TokenShop from './TokenShop/Shop/Shop'
import Admin from './Admin/Admin'

import Login from './Login/login'
import SignUp from './SignUp/signup'
import Profile from './Profile/profile'
import GameCreatedPage from "./GameCreated/GameCreatedPage";

function MainPage() {
    const sub_path = useParams();
    let title = 'Just to test that the router works';

    if (!!sub_path && !!sub_path.title) {
        title = sub_path.title;
    }
    console.log(title);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
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

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          loggedIn === true ? (
            <Component {...rest} {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: "" };
    }

    
    onLogin(username, password){
        let data = {
            email: username,
            password: password
        }
        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
            'Accept': 'application/json , text/plain',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": 'http://localhost:3000'
            }
          })
          .then(res => {
            if (res.status === 200) {
                console.log(res)
                window.location.href='/profile'
            } else {
                const error = new Error(res.error);
                throw error;
            }
          })
          .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
          });
    }

    onInfo(){
        fetch("http://localhost:5000/users/getInfo", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": 'http://localhost:3000'
            }
        }).then(res => {if (res.status == 400) {
            alert('Failed')
        } else {
            console.log('Added')
            alert('succeeed')
        }
        console.log(res.session) })
        .catch(err => err)
    }


    render() {
        return (
            <Router>
                <Switch>
                    {/* the above one is just a dummy page to test the router works */}

                    <Route path="/gameplay">
                        <GamePlayPage/>
                    </Route>
                    <Route path="/gameedit">
                        <GameEditPage/>
                    </Route>
                    <Route path="/lobby">
                        <LayoutLobby/>
                    </Route>
                    <Route path="/gameroom">
                        <GameRoomPage/>
                    </Route>
                    <Route path="/gamecreated">
                        <GameCreatedPage/>
                    </Route>
                    <Route exact path='/shop' render={() =>
                        (<TokenShop state={this.state}/>)}/>
                    <Route exact path='/admin' render={() =>
                        (<Admin state={this.state}/>)}/>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    <Route path="/profile" render={logProps => <Profile {...logProps} onInfo={this.onInfo}/>} />
                    <Route path="" render={logProps => <Login {...logProps} onLogin={this.onLogin}/>}/>

                    {/* add your own pages' path above this line */}
                    {/* <Route exact_path=''>
                            <MainPage/>
                        </Route> */}
                </Switch>
            </Router>
        );
    }
}

export default App;
