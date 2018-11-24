import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import { NavLink } from 'react-router-dom';

// aliased import
import {
  initialContent as actionInitialContent,
  viewContent as actionViewContent,
  addContent as actionAddContent,
} from '../../store/actions/contentActions';
import ContentList from './ContentList';

const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    // initialdb用
    props.initialContent();
  }

  addContent() {
    const { idCount, addContent } = this.props;
    addContent(idCount);
  }

  viewContent(e, con) {
    const { viewContent } = this.props;
    viewContent(con);
  }

  render() {
    const { contents, selectContent } = this.props;
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
        <Menu theme="dark" selectedKeys={[selectContent.id]}>
          <Menu.Item key="plus" onClick={() => this.addContent()}>
            <Icon type="plus-circle" theme="outlined" />
          </Menu.Item>
          <Menu.Item key="back">
            <NavLink to="/dashboard">aaa</NavLink>
          </Menu.Item>
          {contents.map(con => (
            <Menu.Item key={con.id} onClick={e => this.viewContent(e, con)}>
              <ContentList
                title={con.title}
                contentId={con.id}
                numberOfContents={contents.length}
              />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = state => ({
  contents: state.content.contents,
  selectContent: state.content.selectContent,
  idCount: state.content.idCount,
});

const mapDispatchToProps = dispatch => ({
  initialContent: () => dispatch(actionInitialContent()),
  addContent: id => dispatch(actionAddContent(id)),
  viewContent: selectContent => dispatch(actionViewContent(selectContent)),
});

Sidebar.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  selectContent: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  idCount: PropTypes.number.isRequired,
  initialContent: PropTypes.func.isRequired,
  addContent: PropTypes.func.isRequired,
  viewContent: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
