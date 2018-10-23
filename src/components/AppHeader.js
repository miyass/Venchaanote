import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout;

export default class AppHeader extends React.Component {
  render() {
    return (
      <Header style={{ color: 'white', backgroundColor: 'blue' }}>
        Header
      </Header>
    )
  }
}
