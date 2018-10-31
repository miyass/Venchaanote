import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Dropdown } from 'antd'
import { deleteContent } from '../store/actions/contentActions'

class ContentList extends React.Component {
  constructor(props) {
    super(props);

    this.deleteContent = this.deleteContent.bind(this);
  }

  deleteContent() {
    this.props.deleteContent(this.props.contentId, this.props.numberOfContents)
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="delete" onClick={this.deleteContent}>Delete</Menu.Item>
      </Menu>
    );
    return(
      <Dropdown overlay={menu} trigger={['contextMenu']}>
        <div style={{width: '100%', height: '100%'}}>
          <p>{this.props.title}</p>
        </div>
      </Dropdown>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContent: (contentId, numberOfContents) => dispatch(deleteContent(contentId, numberOfContents))
  }
}

export default connect(null, mapDispatchToProps)(ContentList)
