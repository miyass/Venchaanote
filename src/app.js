import React from 'react';
import { Layout, Menu, Icon } from 'antd'

import Sidebar from './components/Sidebar'
import TextContent from './components/TextContent'

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <TextContent />
      </Layout>);
  }
}
