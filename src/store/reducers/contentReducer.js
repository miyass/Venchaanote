const initState = {
  contents: [
    {id: '1', title: 'aaaa', content: '# title \n# 1'},
    {id: '2', title: 'bbbb', content: '# title \n# 2'},
    {id: '3', title: 'cccc', content: '# title \n# 3'}
  ],
  perContent: {
    id: '', title: '', content: ''
  }
}

const contentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'VIEW_CONTENT':
      return Object.assign({}, state, {
        perContent: action.perContent
      });
    default:
      return state
  }
}

export default contentReducer
