import { Menu, Icon, Input } from 'antd';
import React, { Component } from "react";
import Room from '../Room/Room';
import "./Home.css";


const Search = Input.Search;


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


export default class Home extends Component {
  state = {
    roomname: '',
    rooms: [1]
  }

  componentDidMount() {

  }
  componentDidUpdate() {

  }

  addRoom(e){

    let arr= this.state.rooms;
    arr.push(e)
    this.setState({rooms:arr})
  }
  handleClick = (e) => {
    
    console.log('click ', e);

  }

  render() {
    const arr = this.state.rooms;

    const listItems = arr.map((number, index) =>

      <Menu.Item key={index}>Room {number}</Menu.Item>

    );
    return (
      <div className='wrapper'>
        <div className='menu'>
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >

            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Menu</span></span>}>


              <MenuItemGroup key="g1" title="House">
                {listItems}

                <Menu.Item key='100'>
                  <Search
                    placeholder="room"
                    enterButton="add"
                    size="small"
                    onSearch={value => this.addRoom(value)}
                  />
                </Menu.Item>
              </MenuItemGroup>



            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className='body'>
          <Room ></Room>
        </div>
      </div>
    );
  }
}
