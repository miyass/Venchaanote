import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Layout, Col, Button, Menu, Dropdown,
} from 'antd';
import {
  Editor, EditorState, ContentState, Modifier,
} from 'draft-js';

import Markdown from './Markdown';

import {
  titleChange as actionTitleChange,
  contentChange as actionContentChange,
} from '../store/actions/contentActions';

const { Content } = Layout;
let markdownText = '';

class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(
        ContentState.createFromText(props.selectContent.content),
      ),
      markdown: props.selectContent.content,
      title: props.selectContent.title,
      editorScreenSize: 12,
      markdownScreenSize: 12,
    };

    // ライフサイクル外の関数から state を参照するための bind
    this.contentChange = this.contentChange.bind(this);
    this.contentTypeEnd = this.contentTypeEnd.bind(this);

    // editor関係 tabキーの実装
    this.onTab = this.onTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.selectContent.title,
      editorState: EditorState.createWithContent(
        ContentState.createFromText(nextProps.selectContent.content),
      ),
      markdown: nextProps.selectContent.content,
    });
  }

  onTab(e) {
    const { editorState } = this.state;
    e.preventDefault();
    const tabCharacter = '    ';
    const currentState = editorState;
    const newContentState = Modifier.replaceText(
      currentState.getCurrentContent(),
      currentState.getSelection(),
      tabCharacter,
    );
    this.setState({
      editorState: EditorState.push(currentState, newContentState, 'insert-characters'),
    });
  }

  titleChange(e) {
    const { selectContent, titleChange } = this.props;
    this.setState({
      title: e.target.value,
    });
    titleChange(selectContent.id, e.target.value, false);
  }

  contentChange(editorState) {
    const { selectContent, contentChange } = this.props;
    const contents = editorState.getCurrentContent().getBlockMap();
    let preTexts = '';
    contents.map(content => preTexts += `${content.getText()}\n`);
    markdownText = preTexts;
    this.setState({
      markdown: markdownText,
    });
    this.setState({ editorState });
    contentChange(selectContent.id, preTexts, false);
  }

  titleTypeEnd() {
    const { selectContent, titleChange } = this.props;
    const { title } = this.state;
    titleChange(selectContent.id, title, true);
  }

  contentTypeEnd() {
    const { selectContent, contentChange } = this.props;
    const { markdown } = this.state;
    contentChange(selectContent.id, markdown, true);
  }

  screenChange(editorScreenSize, markdownScreenSize) {
    this.setState({
      editorScreenSize,
      markdownScreenSize,
    });
  }

  render() {
    const {
      editorState, markdown, title, editorScreenSize, markdownScreenSize,
    } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="splitScreen" onClick={() => this.screenChange(12, 12)}>
          Split Screen
        </Menu.Item>
        <Menu.Item key="fullEditScreen" onClick={() => this.screenChange(24, 0)}>
          Full Edit Screen
        </Menu.Item>
        <Menu.Item key="fullMarkdownScreen" onClick={() => this.screenChange(0, 24)}>
          Full Markdown Screen
        </Menu.Item>
        <Menu.Divider />
      </Menu>
    );

    return (
      <Layout style={{ marginLeft: 200, height: '100vh' }}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            shape="circle"
            icon="ellipsis"
            size="small"
            style={{
              overflow: 'auto',
              position: 'fixed',
              top: 30,
              right: 50,
            }}
          />
        </Dropdown>
        <Content style={{ margin: '24px 16px 24px' }}>
          <input
            type="text"
            className="titleInputField"
            placeholder="Title"
            value={title}
            onChange={e => this.titleChange(e)}
            onBlur={() => this.titleTypeEnd()}
          />
          <Col span={editorScreenSize}>
            <Editor
              editorState={editorState}
              onTab={this.onTab}
              onChange={this.contentChange}
              onBlur={this.contentTypeEnd}
            />
          </Col>
          <Col span={markdownScreenSize}>
            <Markdown
              markdown={markdown}
            />
          </Col>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  selectContent: state.content.selectContent,
});

const mapDispatchToProps = dispatch => ({
  titleChange: (id, title, saveDBCheck) => (
    dispatch(actionTitleChange(id, title, saveDBCheck))
  ),
  contentChange: (id, content, saveDBCheck) => (
    dispatch(actionContentChange(id, content, saveDBCheck))
  ),
});

TextContent.propTypes = {
  selectContent: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  titleChange: PropTypes.func.isRequired,
  contentChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TextContent);
