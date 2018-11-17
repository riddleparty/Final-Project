import React, { Component } from "react";
import "./Room.css";
import { Switch } from 'antd';
import { Progress } from 'antd';


import * as firebase from 'firebase';


const config = {
  apiKey: "AIzaSyBP4nQ3aIXnDzziz_oiq5lBHryfl6K7uKI",
  authDomain: "home-automation-smardo.firebaseapp.com",
  databaseURL: "https://home-automation-smardo.firebaseio.com",
  projectId: "home-automation-smardo",
  storageBucket: "home-automation-smardo.appspot.com",
  messagingSenderId: "942353647693"
};
var fire = firebase.initializeApp(config);
const database = fire.database();





export default class Welcome extends Component {



  constructor(props) {
    super(props);

    this.state = {
      data: {},
      temp: 75.2
    }

  }


  componentDidMount() {
    var that = this;
    database.ref().on("value", function (snapshot) {
      let roomTemp = snapshot.val().roomTemp;
      console.log(snapshot.val())
      console.log(roomTemp)
      that.setState({ temp: roomTemp })



    });

  }
  componentDidUpdate() {
    console.log(this.state)
  }


  onChange(checked) {
    var that = this;
    console.log(`switch to ${checked}`);
    database.ref().set({
      room1Light_Status: checked,
      roomTemp: that.state.temp
    });
  }

  getWeather() {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {

    return (
      <div className='roomContainer'>
        <div className='imgClass'>
          <img alt='' style={{width:'800px'}} src={"https://obsessedwiththenest.files.wordpress.com/2011/07/victorson_room-blueprint.jpg"}></img>
          <div  style={{display:'inline-block'}}>
            <Switch defaultChecked onChange={(e) => this.onChange(e)} />,
          </div>
          <div  style={{display:'inline-block'}}>
            <Progress type="circle" percent={this.state.temp} format={percent => `${percent} degrees`} />
          </div>
        </div>

        <div>
          {/* <h1> Your Room</h1> */}
        </div>


      </div>
    );
  }
} 