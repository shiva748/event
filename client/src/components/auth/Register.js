import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { register, clearErrors } from '../../redux/actions/authActions';

const Register = ({ register, isAuthenticated, error, clearErrors }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

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

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="auth-bg py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
              <div className="card-header bg-primary text-white text-center py-4">
                <h3 className="mb-0 font-weight-bold">Create Your Account</h3>
              </div>
              
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <i className="fas fa-user-plus fa-3x text-primary"></i>
                  <p className="mt-3 text-muted">Join our community of event enthusiasts</p>
                </div>
                
                <form onSubmit={onSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                  
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
                    <small className="text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
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
                        placeholder="Create a password"
                        required
                        minLength="6"
                      />
                    </div>
                    <small className="form-text text-muted">
                      Your password must be at least 6 characters long
                    </small>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password2" className="form-label">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        placeholder="Confirm your password"
                        required
                        minLength="6"
                      />
                    </div>
                  </div>
                  
                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="agreeTerms" 
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">
                      I agree to the <a href="#!" className="text-primary">Terms of Service</a> and <a href="#!" className="text-primary">Privacy Policy</a>
                    </label>
                  </div>
                  
                  <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-primary py-2">
                      <i className="fas fa-user-plus me-2"></i>
                      Create Account
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-muted">Already have an account?</span>{' '}
                    <Link to="/login" className="text-primary fw-bold">Sign in</Link>
                  </div>
                </form>
              </div>
              
              <div className="card-footer bg-light text-center py-3">
                <div className="small">
                  <i className="fas fa-shield-alt me-1 text-muted"></i>
                  Your information is secure with us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.string,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
