import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Layout, Row, Col, Input } from 'antd'
import {Editor, EditorState, ContentState} from 'draft-js';
import ReactMarkdown from 'react-markdown'

import { titleChange, contentChange } from '../store/actions/contentActions'

const { Content } = Layout;
let markdown = ""

class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      markdown: "",
      title: "title",
    };

    // ライフサイクル外の関数から state を参照するための bind
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("textcontentのcomponentWillReceiveProps");
    this.setState({
      title: nextProps.perContent.title,
      editorState: EditorState.createWithContent(ContentState.createFromText(nextProps.perContent.content)),
      markdown: nextProps.perContent.content
    });
  }

  titleChange(e){
    this.setState({
      title: e.target.value
    });
    this.props.titleChange(e.target.value);
  }

  contentChange(editorState){
    let contents = editorState.getCurrentContent().getBlockMap()
    let preTexts = ""
    contents.map((content) => {
      preTexts += content.getText() + "\n";
    });
    markdown = preTexts;
    this.setState({markdown});
    this.setState({editorState});
    this.props.contentChange(preTexts);
  }

  render() {
    console.log("TextContent再レンダリング");
    return(
      <Layout style={{ marginLeft: 100 }}>
         <Content style={{ margin: '24px 16px 24px' }}>
           <Input placeholder="Title" value={this.state.title} onChange={this.titleChange} />
           <Col span={12}>
            <Editor editorState={this.state.editorState} onChange={this.contentChange} />
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
  console.log("textcontentのmapStateToProps");
  return {
    perContent: state.content.perContent,
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log("textcontentのmapDispatchToProps");
  return {
    titleChange: (title) => dispatch(titleChange(title)),
    contentChange: (content) => dispatch(contentChange(content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextContent)
