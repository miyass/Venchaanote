import React from 'react';
import { Layout } from 'antd';

import Sidebar from './Sidebar';
import TextContent from './TextContent';

export default class Note extends React.Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <TextContent />
      </Layout>
    );
  }
}
