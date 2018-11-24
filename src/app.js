import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Layout } from 'antd';

import rootReducer from './store/reducers/rootReducer';
import NoteRoute from './components/NoteRoute';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NoteRoute />
      </Provider>
    );
  }
}
