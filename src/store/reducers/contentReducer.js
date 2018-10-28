const initState = {
  contents: [
    {id: '1', title: 'sample', content: '# title \n# 1'},
  ],
  selectContent: {
    id: '', title: '', content: ''
  },
  idCount: 1
}

const contentReducer = (state = initState, action) => {
  //今タイプしてるcontentのidは取れるけど不安定かも...
  let currentId = state.selectContent.id;
  let currentContents = state.contents;
  switch (action.type) {
    case 'VIEW_CONTENT':
      return Object.assign({}, state, {
        selectContent: action.selectContent,
      });
    case 'ADD_CONTENT':
      currentContents = currentContents.slice(0)
      let id = state.idCount + 1
      let emptyNewContent = {id: id.toString(), title: '', content: ''}
      currentContents.push(emptyNewContent);
      currentContents.sort((a,b) => {
        return b.id - a.id
      });
      return Object.assign({}, state, {
        contents: currentContents,
        selectContent: emptyNewContent,
        idCount: id
      });
    case 'DELETE_CONTENT':
      let newSelectContent = state.selectContent;
      let selectContentOrder = currentContents.indexOf(state.selectContent)
      //最後の一個を削除した時の処理
      if(currentContents.length === 1) {
        let id = state.idCount + 1
        newSelectContent = {id: id.toString() , title: 'sample', content: ''};
        currentContents = [newSelectContent];
        return Object.assign({}, state, {
          contents: currentContents,
          selectContent: newSelectContent,
          idCount: id
        })
      }
      //セレクトしてるやつと削除するやつが一致しているときの処理
      if(currentId === action.contentId) {
        if(selectContentOrder === 0) {
          selectContentOrder += 1;
          newSelectContent = currentContents[selectContentOrder]
        } else {
          newSelectContent = currentContents[selectContentOrder -  1]
        }
      }
      const newContents = currentContents.filter((content) => {
        return !(action.contentId === content.id);
      });
      return Object.assign({}, state, {
        contents: newContents,
        selectContent: newSelectContent
      });
    case 'CHANGE_TITLE':
      //タイトル変更時のみsidebarを再レンダリングしたいので、sliceメソッド適用
      currentContents = currentContents.slice(0)
      state.selectContent.title = action.title;
      return Object.assign({}, state, {
        contents: currentContents
      });
    case 'CHANGE_CONTENT':
      state.selectContent.content = action.content
      return Object.assign({}, state, {
        contents: currentContents
      });
    default:
      return state
  }
}

export default contentReducer
