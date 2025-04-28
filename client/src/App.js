import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import EventForm from './components/events/EventForm';
import MyEvents from './components/events/MyEvents';
import PrivateRoute from './components/routing/PrivateRoute';
import store from './redux/store';
import { loadUser } from './redux/actions/authActions';
import setAuthToken from './utils/setAuthToken';

// Set auth token on initial app loading
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/create-event" 
              element={
                <PrivateRoute>
                  <EventForm />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/my-events" 
              element={
                <PrivateRoute>
                  <MyEvents />
                </PrivateRoute>
              } 
            />
          </Routes>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </Provider>
  );
};

export default App; 