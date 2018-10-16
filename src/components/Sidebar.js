import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Menu, Icon } from 'antd'

const { Sider } = Layout;


export default class Sidebar extends React.Component {

  addContents(e) {
    console.log(e);
  }

  render() {
    return (
      <Sider width={100} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Menu theme="dark">
        <Menu.Item key="icon">
          <Icon type="user" />
        </Menu.Item>
        <Menu.Item key="plus" onClick={this.addContents}>
          <Icon type="plus-circle" theme="outlined" />
        </Menu.Item>
        <Menu.Item key="sub1">
          <span>test1</span>
        </Menu.Item>
        <Menu.Item key="sub2">
          <span>test2</span>
        </Menu.Item>
        <Menu.Item key="sub3">
          <span>test3</span>
        </Menu.Item>
        <Menu.Item key="sub4">
          <span>test4</span>
        </Menu.Item>
        <Menu.Item key="sub5">
          <span>test5</span>
        </Menu.Item>
        <Menu.Item key="sub6">
          <span>test6</span>
        </Menu.Item>
        <Menu.Item key="sub7">
          <span>test7</span>
        </Menu.Item>
        <Menu.Item key="sub8">
          <span>test8</span>
        </Menu.Item>
        <Menu.Item key="sub9">
          <span>test9</span>
        </Menu.Item>
        <Menu.Item key="sub10">
          <span>test10</span>
        </Menu.Item>
        <Menu.Item key="sub11">
          <span>test11</span>
        </Menu.Item>
        <Menu.Item key="sub12">
          <span>test12</span>
        </Menu.Item>
        <Menu.Item key="sub13">
          <span>test13</span>
        </Menu.Item>
        <Menu.Item key="sub14">
          <span>test14</span>
        </Menu.Item>
        <Menu.Item key="sub15">
          <span>test15</span>
        </Menu.Item>
        <Menu.Item key="sub16">
          <span>test16</span>
        </Menu.Item>
        <Menu.Item key="sub17">
          <span>test17</span>
        </Menu.Item>
        <Menu.Item key="sub18">
          <span>test18</span>
        </Menu.Item>
        <Menu.Item key="sub19">
          <span>test19</span>
        </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
