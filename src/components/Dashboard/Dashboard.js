import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Row } from 'antd';
import {
  initializeNotebook as actionInitializeNotebook,
} from '../../store/actions/notebookActions';

import DashboardHeader from './DashboardHeader';
import NotebookList from './NotebookList';

import Sidebar from './Sidebar';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    props.initializeNotebook();
  }

  render() {
    const { notebooks } = this.props;
    return (
        <Layout>
          <Sidebar />
          <DashboardHeader />
          <Layout style={{ marginTop: '50px', marginLeft: 100, height: '100vh'}}>
            <Row>
              {notebooks.map(notebook => (
                <NotebookList key={notebook.id} title={notebook.title} notebookId={notebook.id} />
              ))}
            </Row>
          </Layout>
        </Layout>
    );
  }
}

const mapStateToProps = state => ({
  notebooks: state.notebook.notebooks,
});

const mapDispatchToProps = dispatch => ({
  initializeNotebook: () => dispatch(actionInitializeNotebook()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
