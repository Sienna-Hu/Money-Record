import authReducer from "./authReducer"
import pageReducer from "./pageReducer"
import filterReducer from "./filterReducer"

export default function rootReducer(state = {}, action) {
  return {
    auth: authReducer(state.auth, action),
    page: pageReducer(state.page, action),
    filter: filterReducer(state.ppFilter, action)
  }
}