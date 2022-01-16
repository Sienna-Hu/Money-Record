import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './store';
import App from './App';

import { Provider } from "react-redux";

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <Router>  
        <Routes>
          <Route path='/' element={<App />}/>
        </Routes>
      </Router>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
  );