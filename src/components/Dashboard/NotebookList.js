import React from 'react';
import { connect } from 'react-redux';
import { Col, Card, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  selectNotebook as actionSelectNotebook,
  deleteNotebook as actionDeleteNotebook,
} from '../../store/actions/notebookActions';

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteNotebook() {
    const { notebookId, deleteNotebook } = this.props;
    deleteNotebook(notebookId);
  }

  selectNotebook() {
    const { notebookId, selectNotebook } = this.props;
    selectNotebook(notebookId);
  }

  render() {
    const { title } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key='delete' onClick={() => this.deleteNotebook()}>Delete</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col xs={24} sm={18} md={12} lg={12} xl={6} style={{ margin: '30px', backgroundColor: '#fcfcfc' }}>
          <NavLink to='/note'>
            <Card hoverable title={title} bordered={false} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.26)' }} onClick={() => this.selectNotebook()}>
              <p>Test</p>
              <p>content</p>
            </Card>
          </NavLink>
        </Col>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectNotebook: (id) => dispatch(actionSelectNotebook(id)),
  deleteNotebook: (id) => dispatch(actionDeleteNotebook(id)),
});


export default connect(null, mapDispatchToProps)(NotebookList);
