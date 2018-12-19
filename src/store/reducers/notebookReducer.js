const initState = {
  notebooks: [],
  notebookIdCount: 0
};

const notebookReducer = (state = initState, action) => {
  let currentNotebooks = state.notebooks;
  switch (action.type) {
    case 'INITIAL_NOTEBOOK': {
      currentNotebooks = [];
      for (const key in action.notebooks) {
        currentNotebooks.push(action.notebooks[key]);
      }
      currentNotebooks.sort((a, b) => b.id - a.id);
      return Object.assign({}, state, {
        notebooks: currentNotebooks,
        notebookIdCount: Number(action.notebookIdCount),
      });
    }
    case 'ADD_NOTEBOOK': {
      currentNotebooks = currentNotebooks.slice(0);
      currentNotebooks.push(action.emptyNewNotebook);
      currentNotebooks.sort((a, b) => b.id - a.id);
      return Object.assign({}, state, {
        notebooks: currentNotebooks,
        notebookIdCount: Number(action.emptyNewNotebook.id),
      });
    }
    case 'DELETE_NOTEBOOK': {
      const newNotebooks = currentNotebooks.filter(notebook => !(notebook.id === action.notebookId));
      return Object.assign({}, state, {
        notebooks: newNotebooks,
      });
    }
    case 'VIEW_NOTEBOOK': {
      return Object.assign({}, state, {
        notebooks: state.notebooks,
      });
    }
    case 'CHANGE_NOTEBOOK_TITLE': {
      currentNotebooks.map((value) => {
        if(value.id === action.notebookId) {
          value.title = action.title;
        }
      });
      return Object.assign({}, state, {
        notebooks: currentNotebooks,
      });
    }
    default: {
      return state;
    }
  }
}

export default notebookReducer;
