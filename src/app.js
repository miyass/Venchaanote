import React from 'react';
import { Layout, Menu, Icon } from 'antd'

import AppHeader from './components/AppHeader'
import Sidebar from './components/Sidebar'
import TextContent from './components/TextContent'
import AppFooter from './components/AppFooter'

const { Header } = Layout;

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <TextContent />
      </Layout>);
  }
}
