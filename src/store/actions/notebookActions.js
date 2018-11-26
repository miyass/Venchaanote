import Store from 'electron-store';

const store = new Store();

export const initializeNotebook = () => {
  const notebooklist = store.get('notebooks.notebookList');
  const notebookIdCount = store.get("notebooks.notebookIdCount");
  return (dispatch) => {
    dispatch({ type: 'INITIAL_NOTEBOOK', notebooks: notebooklist, notebookIdCount: notebookIdCount });
  };
}

export const selectNotebook = (id) => {
  console.log(id);
  const contentsFromDB = store.get(`contents.${id}.contentList`);
  let idCount = store.get(`contents.${id}.idCount`);
  return (dispatch) => {
    dispatch({ type: 'INITIAL_CONTENT', contents: newContentForReducer, idCount: maxId });
  };
}

export const addNotebook = (id) => {
  const maxNotebookId = id + 1;
  console.log(maxNotebookId);
  const emptyNewNotebook = { id: maxNotebookId.toString(), title: 'sample' };
  store.set(`notebooks.notebookList.${maxNotebookId}`, emptyNewNotebook);
  store.set(`notebooks.notebookIdCount`, maxNotebookId);
  return (dispatch) => {
    dispatch({ type: 'ADD_NOTEBOOK', emptyNewNotebook });
  };
}
