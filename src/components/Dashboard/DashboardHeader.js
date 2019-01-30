import React from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Button, Modal } from 'antd';
import {
  addNotebook as actionAddNotebook,
} from '../../store/actions/notebookActions';

const { Header } = Layout;

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: '',
    }
  }

  monitorTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  configureNotebook() {
    const { title } = this.state;
    this.setState({
      modalVisible: true,
      inputFieldTitle: title
    });
  }

  configureNotebookDone() {
    const { notebookId, addNotebook } = this.props;
    const { title } = this.state;
    addNotebook(notebookId, title);
    this.setState({
      modalVisible: false,
    });
  }

  configureNotebookCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { title } = this.state;
    return (
      <Header style={{ backgroundColor: '#f0f2f5', marginTop: '30px' }}>
        <Button type="primary" shape="circle" icon="plus" onClick={() => this.configureNotebook()} />
        <Modal
          title="Title"
          visible={this.state.modalVisible}
          onOk={() => this.configureNotebookDone()}
          onCancel={() => this.configureNotebookCancel()}
        >
          <input
            type="text"
            className="titleInputField"
            placeholder="Please enter a title..."
            value={title}
            onChange={(e) => this.monitorTitle(e)}
          />
        </Modal>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  notebookId: state.notebook.notebookIdCount
});

const mapDispatchToProps = dispatch => ({
  addNotebook: (id, title) => dispatch(actionAddNotebook(id, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
