import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Layout } from 'antd';

import rootReducer from './store/reducers/rootReducer';
import Sidebar from './components/Sidebar';
import TextContent from './components/TextContent';

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
