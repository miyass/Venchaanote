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

export const titleChange = (title) => {
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_TITLE', title: title})
  }
}

export const contentChange = (content) => {
  return (dispatch, getState) => {
    dispatch({ type: 'CHANGE_CONTENT', content: content})
  }
}
