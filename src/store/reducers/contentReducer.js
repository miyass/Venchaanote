const initState = {
  contents: [],
  selectContent: {},
  idCount: 0,
};

const contentReducer = (state = initState, action) => {
  const currentId = state.selectContent.id;
  let currentContents = state.contents;
  switch (action.type) {
    case 'INITIAL_CONTENT': {
      const initialContents = [];
      for (const key in action.contents) {
        initialContents.push(action.contents[key]);
      }
      currentContents = initialContents;
      currentContents.sort((a, b) => b.id - a.id);
      return Object.assign({}, state, {
        contents: currentContents,
        selectContent: currentContents[0],
        idCount: action.idCount,
      });
    }
    case 'VIEW_CONTENT': {
      return Object.assign({}, state, {
        selectContent: action.selectContent,
      });
    }
    case 'ADD_CONTENT': {
      currentContents = currentContents.slice(0);
      currentContents.push(action.emptyNewContent);
      currentContents.sort((a, b) => b.id - a.id);
      return Object.assign({}, state, {
        contents: currentContents,
        selectContent: action.emptyNewContent,
        idCount: Number(action.emptyNewContent.id),
      });
    }
    case 'DELETE_LASTCONTENT': {
      currentContents = [action.newSelectContent];
      return Object.assign({}, state, {
        contents: currentContents,
        selectContent: action.newSelectContent,
        idCount: action.newSelectContent.id,
      });
    }
    case 'DELETE_CONTENT': {
      let newSelectContent = state.selectContent;
      let selectContentOrder = currentContents.indexOf(state.selectContent);
      // セレクトしてるやつと削除するやつが一致しているときの処理
      if (currentId === action.contentId) {
        if (selectContentOrder === 0) {
          selectContentOrder += 1;
          newSelectContent = currentContents[selectContentOrder];
        } else {
          newSelectContent = currentContents[selectContentOrder - 1];
        }
      }
      const newContents = currentContents.filter(content => !(action.contentId === content.id));
      return Object.assign({}, state, {
        contents: newContents,
        selectContent: newSelectContent,
      });
    }
    case 'CHANGE_TITLE': {
      // タイトル変更時のみsidebarを再レンダリングしたいので、sliceメソッド適用
      currentContents = currentContents.slice(0);
      state.selectContent.title = action.title;
      return Object.assign({}, state, {
        contents: currentContents,
      });
    }
    case 'CHANGE_CONTENT': {
      state.selectContent.content = action.content;
      return Object.assign({}, state, {
        contents: currentContents,
      });
    }
    default: {
      return state;
    }
  }
};

export default contentReducer;
