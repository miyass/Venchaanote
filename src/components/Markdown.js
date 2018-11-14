import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';

class Markdown extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    marked.setOptions({
        highlight: function(code, lang) {
          return hljs.highlightAuto(code, [lang]).value;
        }
    });
  }

  render () {
    let html = marked(this.props.markdown);
    return (
      <div dangerouslySetInnerHTML={{__html: html}}></div>
    );
  }

}

export default connect()(Markdown)
