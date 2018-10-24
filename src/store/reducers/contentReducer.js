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
  //今タイプしてるcontentのidは取れるけど不安定かも...
  let currentId = state.perContent.id;
  let currentContents = state.contents;
  switch (action.type) {
    case 'VIEW_CONTENT':
      console.log(action);
      return Object.assign({}, state, {
        perContent: action.perContent
      });
    case 'CHANGE_TITLE':
      //タイトル変更時のみsidebarを再レンダリングしたいので、sliceメソッド適用
      currentContents = currentContents.slice(0)
      currentContents[currentId - 1].title = action.title;
      return Object.assign({}, state, {
        contents: currentContents
      });
    case 'CHANGE_CONTENT':
      currentContents[currentId - 1].content = action.content
      return Object.assign({}, state, {
        contents: currentContents
      });
    default:
      return state
  }
}

export default contentReducer
