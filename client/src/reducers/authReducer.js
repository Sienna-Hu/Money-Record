import axios from 'axios'

const initAuthState = {
  isAuthenticated: false,
  token: '',
	user: {}
}

export default function authReducer(state = initAuthState, action) {
  switch (action.type) {
    case 'auth/login': {
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user
      }
    }
    case 'auth/logout': {
      return {
        isAuthenticated: false,
        token: '',
        user: {}
      }
    }
    default: {
      return state
    }
  }
}

export function handleLogin(token, user) {
  return function login(dispatch, getState) {
    const payload = {
      isAuthenticated: true,
      token: token,
      user: user
    }
    dispatch({type: 'auth/login', payload: payload})
  }
}

export function handleLogout() {
  localStorage.removeItem("jwtToken")
  return function logout(dispatch, getState) {
    dispatch({type: 'auth/logout'})
  }
}