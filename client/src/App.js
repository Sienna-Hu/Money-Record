// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import Dashboard from './pages/Dashboard';
import SignIn from "./pages/Signin";
import { connect } from 'react-redux';
import { handleLogin, handleLogout } from './reducers/authReducer';

const token = localStorage.getItem("jwtToken")

if (token) {
  const decoded = jwt_decode(token);
  store.dispatch(handleLogin(token, decoded.user));

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(handleLogout());
  }
}

const mapStateToProps = (state) => {
  return { 
    isAuth: state.auth.isAuthenticated,
    tableIndex: state.page.tableIndex
  }
}

function App(isAuth, tableIndex) {
  let shown
  if (!isAuth.isAuth) {
    shown = <SignIn />;
  } else {
    shown = <Dashboard tableIndex={tableIndex.tableIndex} />;
  }

  return (
    <div>
      { shown }
    </div>
  )
}

export default connect(mapStateToProps)(App)
