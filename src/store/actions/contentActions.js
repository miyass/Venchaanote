import Store from 'electron-store';

const store = new Store();

export const initialContent = () => {
  const contentsFromDB = store.get('contents');
  let idCount = store.get('idCount');
  // 起動時、DBに値がnullの時の処理
  if (contentsFromDB === undefined) {
    // idCountがundefinedの時=まだconfig.jsonが作られてない時
    if (idCount === undefined) {
      idCount = 0;
    }
    const maxId = idCount + 1;
    const idString = maxId.toString();
    const newContent = { id: idString, title: 'sample', content: '# これはsampleContentです。' };
    store.set(`contents.${maxId}`, newContent);
    store.set('idCount', maxId);
    // Reducer用に再定義
    const newContentForReducer = { idString: newContent };
    return (dispatch) => {
      dispatch({ type: 'INITIAL_CONTENT', contents: newContentForReducer, idCount: maxId });
    };
  }
  return (dispatch) => {
    dispatch({ type: 'INITIAL_CONTENT', contents: contentsFromDB, idCount });
  };
};

export const viewContent = (selectContent) => {
  return (dispatch) => {
    dispatch({ type: 'VIEW_CONTENT', selectContent });
  };
};

export const addContent = (id) => {
  const maxId = id + 1;
  const emptyNewContent = { id: maxId.toString(), title: '', content: '' };
  store.set(`contents.${maxId}`, emptyNewContent);
  store.set('idCount', maxId);
  return (dispatch) => {
    dispatch({ type: 'ADD_CONTENT', emptyNewContent });
  };
};

export const deleteContent = (contentId, numberOfContents) => {
  store.delete(`contents.${contentId}`);

  if (numberOfContents === 1) {
    const idCount = store.get('idCount');
    const maxId = idCount + 1;
    const newSelectContent = { id: maxId.toString(), title: 'sample', content: '# last' };
    store.set(`contents.${maxId}`, newSelectContent);
    store.set('idCount', maxId);
    return (dispatch) => {
      dispatch({ type: 'DELETE_LASTCONTENT', newSelectContent });
    };
  }

  return (dispatch) => {
    dispatch({ type: 'DELETE_CONTENT', contentId });
  };
};

export const titleChange = (id, title, saveDBCheck) => {
  if (saveDBCheck === true) {
    store.set(`contents.${id}.title`, title);
  }
  return (dispatch) => {
    dispatch({ type: 'CHANGE_TITLE', title });
  };
};

export const contentChange = (id, content, saveDBCheck) => {
  if (saveDBCheck === true) {
    store.set(`contents.${id}.content`, content);
  }
  return (dispatch) => {
    dispatch({ type: 'CHANGE_CONTENT', content });
  };
};
