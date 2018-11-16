import React, { Component } from "react";
import "./Room.css";
import { Switch } from 'antd';
import { Progress } from 'antd';



export default class Welcome extends Component {


  state={
    data:{}
  }

  componentDidUpdate(){
    console.log(this.state)
  }
  getWeather(){
    fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => this.setState({ data }));
}
  
  render() {

    return (
      <div className='roomContainer'>
        <div className='imgClass'>
          <img src={"https://vr-saratov.ru/images/osproperty/category/1441006956_komnata.jpg"}></img>
        </div>
        <div>
          <h1>Hello Room</h1>
        </div>
        <div>
          <Switch loading defaultChecked />
        </div>
        <div>
          <Progress type="circle" percent={20} format={percent => `${percent} degrees`} />
        </div>  
      <button onClick={()=>{this.getWeather()}}></button>
      {this.state.data.info ? <text>{this.state.data.info.seed}</text>:''}
      </div>
    );
  }
} 