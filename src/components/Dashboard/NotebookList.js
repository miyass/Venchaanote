import React from 'react';
import { connect } from 'react-redux';
import { Col, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  selectNotebook as actionSelectNotebook,
} from '../../store/actions/notebookActions';

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
  }

  selectNotebook() {
    const { id } = this.props;
    selectNotebook(id);
  }

  render() {
    const { title } = this.props;
    return (
      <NavLink to="/note" onClick={() => this.selectNotebook()}>
        <Col xs={24} sm={18} md={12} lg={12} xl={6} style={{ margin: '30px', backgroundColor: '#fcfcfc' }}>
          <Card hoverable title={title} bordered={false} style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.26)' }}>
            <p>Test</p>
            <p>content</p>
          </Card>
        </Col>
      </NavLink>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectNotebook: (id) => dispatch(actionSelectNotebook(id)),
});

export default NotebookList;
