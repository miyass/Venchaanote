import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Button, Layout, Menu, Icon, Dropdown } from 'antd'

import { viewContent, addContent } from '../store/actions/contentActions'

import ContentList from './ContentList'
const { Sider } = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.addContent = this.addContent.bind(this);
  }

  componentDidMount() {
    //初期のcontent用。
    let lastNum = this.props.contents.length;
    this.props.viewContent(this.props.contents[lastNum - 1]);
  }

  addContent() {
    this.props.addContent()
  }

  viewContent(e) {
    this.props.viewContent(e)
  }

  render() {
    return (
      <Sider width={100} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        <Menu theme="dark" selectedKeys={[this.props.selectContent.id]}>
          <Menu.Item key="plus" onClick={this.addContent}>
            <Icon type="plus-circle" theme="outlined" />
          </Menu.Item>
          { this.props.contents.map(con =>
          <Menu.Item key={con.id} onClick={this.viewContent.bind(this, con)} >
            <ContentList title={con.title} contentId={con.id} />
          </Menu.Item>

          )}
        </Menu>

      </Sider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contents: state.content.contents,
    selectContent: state.content.selectContent
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addContent: () => dispatch(addContent()),
    viewContent: (selectContent) => dispatch(viewContent(selectContent))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
