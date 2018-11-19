import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { deleteContent as actionDeleteContent } from '../store/actions/contentActions';

class ContentList extends React.Component {
  deleteContent() {
    const { deleteContent, contentId, numberOfContents } = this.props;
    deleteContent(contentId, numberOfContents);
  }

  render() {
    const { title } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="delete" onClick={() => this.deleteContent()}>Delete</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <p>{title}</p>
        </div>
      </Dropdown>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteContent: (contentId, numberOfContents) => (
    dispatch(actionDeleteContent(contentId, numberOfContents))
  ),
});

ContentList.propTypes = {
  title: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
  numberOfContents: PropTypes.number.isRequired,
  deleteContent: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ContentList);
