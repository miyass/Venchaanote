import { combineReducers } from 'redux';
import contentReducer from './contentReducer';
import notebookReducer from './notebookReducer'

const rootReducer = combineReducers({
  content: contentReducer,
  notebook: notebookReducer
});

export default rootReducer;
