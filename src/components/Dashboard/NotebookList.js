import React from 'react';
import { connect } from 'react-redux';
import { Col, Card, Dropdown, Menu, Button, Modal } from 'antd';
import { NavLink } from 'react-router-dom';
import {
  selectNotebook as actionSelectNotebook,
  deleteNotebook as actionDeleteNotebook,
  changeNotebookTitle as actionChangeNotebookTitle,
} from '../../store/actions/notebookActions';

class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      title: this.props.title,
      inputFieldTitle: 'test'
    }
  }

  deleteNotebook() {
    const { notebookId, deleteNotebook } = this.props;
    deleteNotebook(notebookId);
  }

  selectNotebook() {
    const { notebookId, selectNotebook } = this.props;
    selectNotebook(notebookId);
  }

  monitorTitle(e) {
    this.setState({
      inputFieldTitle: e.target.value,
    });
  }

  configureNotebook() {
    const { title, inputFieldTitle } = this.state;
    this.setState({
      modalVisible: true,
      inputFieldTitle: title
    });
  }

  configureNotebookDone() {
    const { notebookId, changeNotebookTitle } = this.props;
    const { title, inputFieldTitle } = this.state;
    changeNotebookTitle(notebookId, inputFieldTitle);
    this.setState({
      title: inputFieldTitle,
      modalVisible: false,
    });
  }

  configureNotebookCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const { title, inputFieldTitle } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key='delete' onClick={() => this.deleteNotebook()}>Delete</Menu.Item>
        <Menu.Item key='configure' onClick={() => this.configureNotebook()}>Rename</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <Col xs={24} sm={10} md={10} lg={6} xl={6} style={{ margin: '30px', backgroundColor: '#fcfcfc' }}>
          <NavLink to='/note'>
            <Card
              hoverable
              title={title}
              bordered={false}
              style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.26)' }}
              onClick={() => this.selectNotebook()}
            >
              <p>content</p>
            </Card>
          </NavLink>
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
              value={inputFieldTitle}
              onChange={(e) => this.monitorTitle(e)}
            />
          </Modal>
        </Col>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectNotebook: (id) => dispatch(actionSelectNotebook(id)),
  deleteNotebook: (id) => dispatch(actionDeleteNotebook(id)),
  changeNotebookTitle: (id, title) => dispatch(actionChangeNotebookTitle(id, title)),
});


export default connect(null, mapDispatchToProps)(NotebookList);
