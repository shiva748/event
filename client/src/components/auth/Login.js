import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { login, clearErrors } from '../../redux/actions/authActions';

const Login = ({ login, isAuthenticated, error, clearErrors }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };

  return (
    <div className="auth-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-0 font-weight-bold">Welcome Back!</h3>
              </div>
              
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="fas fa-user-circle fa-3x text-primary"></i>
                  <p className="mt-3 text-muted">Sign in to your account to continue</p>
                </div>
                
                <form onSubmit={onSubmit}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <label htmlFor="password" className="form-label">Password</label>
                      <a href="#!" className="small text-primary">Forgot Password?</a>
                    </div>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      value="" 
                      id="rememberMe" 
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-primary py-2">
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-muted">Don't have an account?</span>{' '}
                    <Link to="/register" className="text-primary fw-bold">Sign up</Link>
                  </div>
                </form>
              </div>
              
              <div className="card-footer bg-light text-center py-3">
                <div className="small">
                  <i className="fas fa-lock me-1 text-muted"></i>
                  Secure Login - Your data is protected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login); 