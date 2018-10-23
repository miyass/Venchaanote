import React from 'react'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './store/reducers/rootReducer'

import { Layout, Menu, Icon } from 'antd'
import AppHeader from './components/AppHeader'
import Sidebar from './components/Sidebar'
import TextContent from './components/TextContent'
import AppFooter from './components/AppFooter'

const { Header } = Layout;
const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Sidebar />
          <TextContent />
        </Layout>
      </Provider>
    );
  }
}
