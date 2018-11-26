const initState = {
  notebooks: [
    { id: '1', title: 'LiT' },
  ],
  notebookId: 1
};

const notebookReducer = (state = initState, action) => {
  let currentNotebooks = state.notebooks;
  switch (action.type) {
    case 'ADD_NOTEBOOK': {
      currentNotebooks = currentNotebooks.slice(0);
      currentNotebooks.push(action.emptyNewNotebook);
      currentNotebooks.sort((a, b) => b.id - a.id);

      return Object.assign({}, state, {
        notebooks: currentNotebooks,
        notebookId: Number(action.emptyNewNotebook.id),
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
