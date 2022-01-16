const initFilterState = {
  ppFilters: []
}

export default function filterReducer(state = initFilterState, action) {
  switch (action.type) {
    case 'filter/setPPfilters' : {
      return {
        ppFilters : action.payload.ppFilters
      }
    }
    default: {
      return state
    }
  }
}

export function handleSetPPFilter(pp) {
  return function setPPFilter(dispatch, getState) {
    const payload = {
      ppFilters : pp
    }
    dispatch({type: 'filter/setPPfilters', payload: payload})
  }
}