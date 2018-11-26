
export const addNotebook = (id) => {
  const maxNotebookId = id + 1;
  const emptyNewNotebook = { id: maxNotebookId.toString(), title: 'sample' };
  return (dispatch) => {
    dispatch({ type: 'ADD_NOTEBOOK', emptyNewNotebook });
  };
}
