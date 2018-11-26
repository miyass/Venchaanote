import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card } from 'antd';

import { NavLink } from 'react-router-dom';

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavLink to="/note">
        <Col xs={24} sm={18} md={12} lg={12} xl={6} style={{ margin: '30px', backgroundColor: '#fcfcfc' }}>
          <Card hoverable title={this.props.title} bordered={false} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.26)' }}>
            <p>Test</p>
            <p>content</p>
          </Card>
        </Col>
      </NavLink>
    );
  }
}

export default NotebookList;
