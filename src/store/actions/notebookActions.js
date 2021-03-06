import Store from 'electron-store';

const store = new Store();

export const initializeNotebook = () => {
  let notebooklist = store.get('notebooks.notebookList');
  let notebookIdCount = store.get("notebooks.notebookIdCount");

  if(notebooklist === undefined || notebookIdCount === undefined) {
    notebookIdCount = 1;
    notebooklist = { '1': { 'id': '1', 'title': 'Sample' }};
    store.set('notebooks.notebookList', notebooklist);
    store.set('notebooks.notebookIdCount', notebookIdCount);

    const emptyNewContent = { id: '1', title: 'sample', content: '# これはsampleContentです。'};
    store.set(`contents.1.contentList.1`, emptyNewContent);
    store.set(`contents.1.idCount`, 1);
  }

  return (dispatch) => {
    dispatch({ type: 'INITIAL_NOTEBOOK', notebooks: notebooklist, notebookIdCount: notebookIdCount });
  };
}

export const selectNotebook = (id) => {
  const contentList = store.get(`contents.${id}.contentList`);
  const idCount = store.get(`contents.${id}.idCount`);
  return (dispatch) => {
    dispatch({ type: 'INITIAL_CONTENT', contents: contentList, idCount: idCount, notebookId: id});
  };
}

export const addNotebook = (id, title) => {
  const maxNotebookId = id + 1;
  const emptyNewNotebook = { id: maxNotebookId.toString(), title: title };
  store.set(`notebooks.notebookList.${maxNotebookId}`, emptyNewNotebook);
  store.set(`notebooks.notebookIdCount`, maxNotebookId);

  const emptyNewContent = { id: '1', title: 'sample', content: '# これはsampleContentです。'};
  store.set(`contents.${maxNotebookId}.contentList.${maxNotebookId}`, emptyNewContent);
  store.set(`contents.${maxNotebookId}.idCount`, 1);
  return (dispatch) => {
    dispatch({ type: 'ADD_NOTEBOOK', emptyNewNotebook });
  };
}

export const deleteNotebook = (id) => {
  store.delete(`notebooks.notebookList.${id}`);
  store.delete(`contents.${id}`);
  return (dispatch) => {
    dispatch({ type: 'DELETE_NOTEBOOK', notebookId: id });
  };
}

export const changeNotebookTitle = (id, title) => {
  store.set(`notebooks.notebookList.${id}.title`, title);
  return (dispatch) => {
    dispatch({ type: 'CHANGE_NOTEBOOK_TITLE', notebookId: id, title: title });
  };
}
