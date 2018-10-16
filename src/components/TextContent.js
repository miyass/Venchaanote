import React from 'react'
import ReactDOM from 'react-dom'
import { Layout, Row, Col } from 'antd'

import {Editor, EditorState} from 'draft-js';
import ReactMarkdown from 'react-markdown'

const { Content } = Layout;
let markdown = ""

export default class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      markdown: ""
    };
    this.onChange = (editorState) => {
      // console.log(editorState.getCurrentContent().getFirstBlock().getText());
      let contents = editorState.getCurrentContent().getBlockMap()
      let preTexts = ""
      contents.map((content) => {
        preTexts += content.getText() + "\n";
      });
      markdown = preTexts;
      this.setState({markdown});
      this.setState({editorState});
    };
  }
  render() {
    return(
      <Layout style={{ marginLeft: 100 }}>
         <Content style={{ margin: '24px 16px 24px' }}>
           <Col span={12} style={{ backgroundColor: 'gray' }}>
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
          </Col>
          <Col span={12} style={{ backgroundColor: 'lightGray', color: 'white'}}>
            <ReactMarkdown source={this.state.markdown} />
          </Col>
        </Content>
      </Layout>
    )
  }
}
