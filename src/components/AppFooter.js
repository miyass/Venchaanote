import React from 'react';
import { Layout } from 'antd'

const { Footer } = Layout;

export default class AppFooter extends React.Component {
  render() {
    return (
      <Footer style={{ color: 'white', backgroundColor: 'blue' }}>
        Header
      </Footer>
    )
  }
}
