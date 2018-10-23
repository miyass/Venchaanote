export const viewContent = (perContent) => {
  return (dispatch, getState) => {
    dispatch({ type: 'VIEW_CONTENT', perContent: perContent})
  }
}
