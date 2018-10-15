import React from 'react'
import ReactDOM from 'react-dom'
import { Layout } from 'antd'
import {Editor, EditorState} from 'draft-js';

const { Header, Content, Footer } = Layout;


export default class TextContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return(
      <Layout style={{ marginLeft: screen.width / 4 }}>
        <Header style={{ color: 'white', backgroundColor: 'black' }}>
          Header
        </Header>
         <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <span>Text</span>
          <Editor editorState={this.state.editorState} onChange={this.onChange} placeHolder="write something.." />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    )
  }
}
