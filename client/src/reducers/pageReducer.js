const initPageState = {
  tableIndex: 0
}

export default function pageReducer(state = initPageState, action) {
  switch (action.type) {
    case 'page/changeTable' : {
      return {
        tableIndex : action.payload.tableIndex
      }
    }
    default: {
      return state
    }
  }
}

export function handleSelectTable(tableIndex) {
  return function changeTable(dispatch, getState) {
    const payload = {
      tableIndex: tableIndex
    }
    dispatch({type: 'page/changeTable', payload: payload})
  }
}