import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import marked from 'marked';
import hljs from 'highlight.js';

class Markdown extends React.Component {
  componentDidUpdate() {
    marked.setOptions({
      highlight(code, lang) {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });
  }

  render() {
    const { markdown } = this.props;
    const html = marked(markdown);
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}

Markdown.propTypes = {
  markdown: PropTypes.string.isRequired,
};

export default connect()(Markdown);
