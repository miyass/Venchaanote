import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Layout, Row, Col, Input, Button, Menu, Dropdown } from 'antd'
const { Content } = Layout;
import {Editor, EditorState, ContentState, Modifier} from 'draft-js';

import Markdown from './Markdown';

import { titleChange, contentChange } from '../store/actions/contentActions'

let markdown = ""

class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.selectContent.content)),
      markdown: this.props.selectContent.content,
      title: this.props.selectContent.title,
      editorScreenSize: 12,
      markdownScreenSize: 12
    };

    // ライフサイクル外の関数から state を参照するための bind
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.titleTypeEnd = this.titleTypeEnd.bind(this);
    this.contentTypeEnd = this.contentTypeEnd.bind(this);

    //editor関係 tabキーの実装
    this.onTab = this.onTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.selectContent.title,
      editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.selectContent.content)),
      markdown: nextProps.selectContent.content
    });
  }

  titleChange(e) {
    this.setState({
      title: e.target.value
    });
    this.props.titleChange(this.props.selectContent.id, e.target.value, false);
  }

  contentChange(editorState) {
    let contents = editorState.getCurrentContent().getBlockMap()
    let preTexts = ""
    contents.map((content) => {
      preTexts += content.getText() + "\n";
    });
    markdown = preTexts;
    this.setState({markdown});
    this.setState({editorState});
    this.props.contentChange(this.props.selectContent.id, preTexts, false);
  }

  titleTypeEnd() {
    this.props.titleChange(this.props.selectContent.id, this.state.title, true);
  }

  contentTypeEnd() {
    this.props.contentChange(this.props.selectContent.id, this.state.markdown, true);
  }

  onTab(e) {
    e.preventDefault();
    const tabCharacter = "    ";
    let currentState = this.state.editorState;
    let newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter
    );
    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters')
    });
  }

  screenChange(editorScreenSize, markdownScreenSize) {
    console.log(editorScreenSize, markdownScreenSize);
    this.setState({
      editorScreenSize: editorScreenSize,
      markdownScreenSize: markdownScreenSize
    });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="splitScreen" onClick={this.screenChange.bind(this, 12, 12)}>
          Split Screen
        </Menu.Item>
        <Menu.Item key="fullEditScreen" onClick={this.screenChange.bind(this, 24, 0)}>
          Full Edit Screen
        </Menu.Item>
        <Menu.Item key="fullMarkdownScreen" onClick={this.screenChange.bind(this, 0, 24)}>
          Full Markdown Screen
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    );

    return(
      <Layout style={{ marginLeft: 200, height: '100vh' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button shape="circle" icon="ellipsis" size="small" style={{ overflow: 'auto', position: 'fixed', top: 30, right: 50 }} />
        </Dropdown>
        <Content style={{ margin: '24px 16px 24px' }}>
          <input type="text" className="titleInputField" placeholder="Title" value={this.state.title} onChange={this.titleChange} onBlur={this.titleTypeEnd} />
          <Col span={this.state.editorScreenSize}>
            <Editor editorState={this.state.editorState} onTab={this.onTab} onChange={this.contentChange} onBlur={this.contentTypeEnd} />
          </Col>
          <Col span={this.state.markdownScreenSize}>
            <Markdown markdown={this.state.markdown} />
          </Col>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectContent: state.content.selectContent,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    titleChange: (id, title, saveDBCheck) => dispatch(titleChange(id, title, saveDBCheck)),
    contentChange: (id, content, saveDBCheck) => dispatch(contentChange(id, content, saveDBCheck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextContent)
