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
        notebookIdCount: action.notebookIdCount
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
    case 'VIEW_NOTEBOOK': {
      console.log("notebookReducerです。");
      return Object.assign({}, state, {
        notebooks: state.notebooks,
      });
    }
    default: {
      return state;
    }
  }
}

export default notebookReducer;
