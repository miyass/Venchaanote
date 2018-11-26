import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Row } from 'antd';
import {
  initializeNotebook as actionInitializeNotebook,
} from '../../store/actions/notebookActions';

import DashboardHeader from './DashboardHeader';
import NotebookList from './NotebookList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    props.initializeNotebook();
  }

  render() {
    const { notebooks } = this.props;
    return (
        <Layout style={{ height: '200vh' }}>
          <DashboardHeader />
          <Row  style={{ marginTop: '50px' }}>
            {notebooks.map(notebook => (
              <NotebookList key={notebook.id} title={notebook.title} notebookId={notebook.id} />
            ))}
          </Row>
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
