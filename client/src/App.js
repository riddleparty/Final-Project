import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
//import logo from "./logo.svg";
import 'antd/dist/antd.css';
import "./App.css";
import LoginScreen from './components/LoginScreen/LoginScreen'
import Footer from "./components/Footer";
import Home from "./components/Home/Home";
import { Router, Route, Link ,Switch} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

const newHistory = createBrowserHistory();



class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path='/' component={LoginScreen} />
          <Route path='/Home' component={Home} />
        </Switch>
    );
  }
}

export default App;
