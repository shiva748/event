import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/authActions';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/create-event">Create Event</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/my-events">My Events</Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="d-none d-md-inline">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-calendar-alt me-2"></i> EventHub
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar); 