import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Layout, Row } from 'antd';

import DashboardHeader from './DashboardHeader';
import NotebookList from './NotebookList';

class Dashboard extends React.Component {
  render() {
    const { notebooks } = this.props;
    return (
        <Layout style={{ height: '200vh' }}>
          <DashboardHeader />
          <Row  style={{ marginTop: '50px' }}>
            {console.log(notebooks)}
            {notebooks.map(notebook => (
              <NotebookList key={notebook.id} title={notebook.title} />
            ))}
          </Row>
        </Layout>
    );
  }
}

const mapStateToProps = state => ({
  notebooks: state.notebook.notebooks,
});

export default connect(mapStateToProps)(Dashboard);
