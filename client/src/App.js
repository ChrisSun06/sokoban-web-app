import React from 'react';
import logo from './logo.svg';
//import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { readCookie, checkAdmin } from "./action/user";
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

import Login from './Login'
import SignUp from './SignUp/signup'
import Profile from './Profile/profile'
import GameCreatedPage from "./GameCreated/GameCreatedPage";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: null,
        isAdmin: false
        };
        readCookie(this);
        checkAdmin(this);
        this.adminSecured = this.adminSecured.bind(this)
        this.profileSecured = this.profileSecured.bind(this)
    }

    adminSecured(logProps) {
        if (this.state.email && this.state.isAdmin){
            return  (<Admin state={this.state}/>);
        } else if (this.state.email && !this.state.isAdmin){
            return  (<Profile {...logProps} onLogOff={this.onLogOff} onInfo={this.onInfo}/>);
        } else {
            return (<Login {...logProps} onLogin={this.onLogin}/>);
        }
    }

    profileSecured(logProps) {
        if (this.state.email && this.state.isAdmin){
            return  (<Admin state={this.state}/>);
        } else if (this.state.email && !this.state.isAdmin){
            return  (<Profile {...logProps} onLogOff={this.onLogOff} onInfo={this.onInfo}/>);
        } else {
            return (<Login {...logProps} onLogin={this.onLogin}/>);
        }
    }

    onLogOff(){
        const url = "/logoff";
        fetch(url)
        .then(res => {
            window.location.href = '/'
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    onLogin(username, password, remember){
        let data = {
            email: username,
            password: password,
            remember_me: remember
        }
        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
            'Accept': 'application/json , text/plain',
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": '*'
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
        fetch("/users/getInfo", {
            method: 'GET',
            redirect: 'follow',
            credentials: 'include',
            headers: {
                'Accept': 'application/json , text/plain',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            }
        }).then(res => {if (res.status == 400) {
            alert('Failed')
        } else {
            console.log('Added')
            alert('succeed')
        }
        console.log(res.session) })
        .catch(err => err)
    }


    render() {
        return (
            <Router>
                <Switch>
                    {/* the above one is just a dummy page to test the router works */}

                    <Route exact path="/gameplay" render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <GamePlayPage/>}
                        </div>
                        )}/>
                    <Route exact path="/gameedit" render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <GameEditPage/>}
                        </div>
                        )}/>
                    <Route exact path="/lobby" render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <LayoutLobby/>}
                        </div>
                        )}/>
                    <Route exact path="/gameroom" render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <GameRoomPage/>}
                        </div>
                        )}/>
                    <Route exact path='/gamecreated' render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <GameCreatedPage/>}
                        </div>
                        )}/>
                    <Route exact path='/shop' render={({ logProps }) =>
                        (
                        <div>
                        {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <TokenShop state={this.state}/>}
                        </div>
                        )}/>
                    <Route exact path='/admin' render={({ logProps }) =>(
                        <div>
                        <this.adminSecured logProps={logProps}/>
                        </div>
                        )}/>
                    <Route path="/signup">
                        <SignUp/>
                    </Route>
                    {/* <Route path="/profile" render={logProps => <Profile {...logProps} onInfo={this.onInfo}/>} /> */}
                    <Route exact path={["/", "/login", "/profile"]}
                        render={({ logProps }) => (
                            <div className="app">
                                {/* {!this.state.email ? <Login {...logProps} onLogin={this.onLogin}/> : <Profile {...logProps} onLogOff={this.onLogOff} onInfo={this.onInfo}/>} */}
                                <this.profileSecured logProps={logProps}/>
                            </div>
                        )}
                    />
                    <Route render={() => <div>404 Not found</div>} />
                </Switch>
            </Router>
        );
    }
}

export default App;
