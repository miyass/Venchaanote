import React from 'react'
import { Layout, Menu, Icon } from 'antd'

class ContentList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <p>{this.props.title}</p>
    )
  }
}

export default ContentList
