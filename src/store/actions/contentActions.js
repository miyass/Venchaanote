export const viewContent = (perContent) => {
  console.log(perContent);
  return (dispatch, getState) => {
    dispatch({ type: 'VIEW_CONTENT', perContent: perContent})
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
