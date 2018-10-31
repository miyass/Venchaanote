import Store from 'electron-store';
const store = new Store();

export const initialContent = () => {
  return (dispatch, getState) => {
    let contentsFromDB = store.get('contents')
    let idCount = store.get('idCount')
    dispatch({ type: 'INITIAL_CONTENT', contents: contentsFromDB, idCount: idCount})
  }
}

export const viewContent = (selectContent) => {
  return (dispatch, getState) => {
    dispatch({ type: 'VIEW_CONTENT', selectContent: selectContent})
  }
}

export const addContent = (id) => {
  console.log(id);
  let maxId = id + 1
  let emptyNewContent = {id: maxId.toString(), title: '', content: ''}
  store.set('contents.' + maxId , emptyNewContent);
  store.set('idCount', maxId);
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_CONTENT', emptyNewContent: emptyNewContent })
  }
}

export const deleteContent = (contentId, numberOfContents) => {
  store.delete('contents.' + contentId);

  if(numberOfContents === 1) {
    let idCount = store.get('idCount')
    let maxId = idCount + 1
    let newSelectContent = {id: maxId.toString() , title: 'sample', content: '# last'};
    store.set('contents.' + maxId , newSelectContent);
    return (dispatch, getState) => {
      dispatch({ type: 'DELETE_LASTCONTENT', newSelectContent: newSelectContent })
    }
  }

  return (dispatch, getState) => {
    dispatch({ type: 'DELETE_CONTENT', contentId: contentId })
  }
}

export const titleChange = (id, title, saveDBCheck) => {
  if (saveDBCheck === true) {
    store.set('contents.' + id + '.title' , title);
  }
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_TITLE', title: title})
  }
}

export const contentChange = (id, content, saveDBCheck) => {
  if (saveDBCheck === true) {
    store.set('contents.' + id + '.content' , content);
  }
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_CONTENT', content: content})
  }
}
