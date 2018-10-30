import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Layout, Row, Col, Input } from 'antd'
const { Content } = Layout;
import {Editor, EditorState, ContentState} from 'draft-js'
import ReactMarkdown from 'react-markdown'

import { titleChange, contentChange } from '../store/actions/contentActions'

let markdown = ""

class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(this.props.selectContent.content)),
      markdown: this.props.selectContent.content,
      title: this.props.selectContent.title,
    };

    // ライフサイクル外の関数から state を参照するための bind
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.titleTypeEnd = this.titleTypeEnd.bind(this);
    this.contentTypeEnd = this.contentTypeEnd.bind(this);
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
    this.props.titleChange(e.target.value, false);
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
    this.props.contentChange(preTexts, false);
  }

  titleTypeEnd() {
    this.props.titleChange(this.state.title, true);
  }

  contentTypeEnd() {
    this.props.contentChange(this.state.markdown, true);
  }

  render() {
    return(
      <Layout style={{ marginLeft: 100, height: '100vh' }}>
         <Content style={{ margin: '24px 16px 24px' }}>
           <input type="text" className="titleInputField" placeholder="Title" value={this.state.title} onChange={this.titleChange} onBlur={this.titleTypeEnd} />
           <Col span={12}>
            <Editor editorState={this.state.editorState} onChange={this.contentChange} onBlur={this.contentTypeEnd} />
          </Col>
          <Col span={12}>
            <ReactMarkdown source={this.state.markdown} />
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
    titleChange: (title, saveDBCheck) => dispatch(titleChange(title, saveDBCheck)),
    contentChange: (content, saveDBCheck) => dispatch(contentChange(content, saveDBCheck))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextContent)
