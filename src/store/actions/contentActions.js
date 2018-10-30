import Store from 'electron-store';
const store = new Store();

export const initialContent = () => {
  return (dispatch, getState) => {
    let contentsFromDB = store.get('contents')
    dispatch({ type: 'INITIAL_CONTENT', contents: contentsFromDB})
  }
}

export const viewContent = (selectContent) => {
  return (dispatch, getState) => {
    dispatch({ type: 'VIEW_CONTENT', selectContent: selectContent})
  }
}

export const addContent = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'ADD_CONTENT' })
  }
}

export const deleteContent = (contentId) => {
  return (dispatch, getState) => {
    dispatch({ type: 'DELETE_CONTENT', contentId: contentId })
  }
}

export const titleChange = (title, saveDBCheck) => {
  if (saveDBCheck === true) {
    // //db処理
    // let saveContent = {
    //   id: this.props.selectContent.id,
    //   title: this.state.title,
    //   content: this.props.selectContent.content
    // }
    // let path = saveContent.id
    // store.set('content.' + path , saveContent);
  }
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_TITLE', title: title})
  }
}

export const contentChange = (content, saveDBCheck) => {
  if (saveDBCheck === true) {
    //db処理
    
  }
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_CONTENT', content: content})
  }
}
