import React from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Button } from 'antd';

import {
  addNotebook as actionAddNotebook,
} from '../../store/actions/notebookActions';

const { Header } = Layout;

class DashboardHeader extends React.Component {

  addNotebook() {
    const { notebookId, addNotebook } = this.props;
    console.log(notebookId);
    addNotebook(notebookId);
  }

  render() {
    return (
      <Header style={{ backgroundColor: '#f0f2f5', marginTop: '30px' }}>
        <Button type="primary" shape="circle" icon="plus" onClick={() => this.addNotebook()} />
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  notebookId: state.notebook.notebookId,
});

const mapDispatchToProps = dispatch => ({
  addNotebook: (id) => dispatch(actionAddNotebook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
