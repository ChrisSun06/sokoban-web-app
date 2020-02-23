import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import GamePlayPage from './GamePlay/GamePlayPage'
import GameEditPage from './GameEdit/GameEditPage'

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

          <Route path="/lol/:title">
            <MainPage/>
          </Route>
          {/* the above one is just a dummy page to test the router works */}
          
          <Route path="/gameplay">
            <GamePlayPage/>
          </Route>
          <Route path="/gameedit">
            <GameEditPage/>
          </Route>
          {/* add your own pages' path above this line */}
          <Route exact_path=''>
            <MainPage/>
          </Route> 
        </Switch>
      </Router>);
  }
}

export default App;
