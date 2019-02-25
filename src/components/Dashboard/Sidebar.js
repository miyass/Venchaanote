import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;

class Sidebar extends React.Component {
  render() {
    return (
      <Sider
        width={200}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu theme="dark">
          <Menu.Item key="plus">
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {

};

export default connect()(Sidebar);
