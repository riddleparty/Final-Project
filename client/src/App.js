import React, { Component } from "react";
//import logo from "./logo.svg";
import 'antd/dist/antd.css';
import "./App.css";
import LoginScreen from './components/LoginScreen/LoginScreen'
import Home from "./components/Home/Home";
import SignUp from './components/signup/SignUp'
import { Route, Switch } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div>
        <div className='appWrapper'>
          {/* <img src='./logo.png'></img> */}
        </div>
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route path='/Home' component={Home} />
          <Route path='/SignUp' component={SignUp} />
        </Switch>

      </div>
    );
  }
}

export default App;
