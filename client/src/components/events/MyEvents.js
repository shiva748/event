import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { getUserEvents } from '../../redux/actions/eventActions';

const MyEvents = ({ 
  auth: { user }, 
  event: { userEvents, loading }, 
  getUserEvents 
}) => {
  useEffect(() => {
    if (user) {
      getUserEvents(user._id);
    }
    // eslint-disable-next-line
  }, [user]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="text-center mb-4">My Registered Events</h1>
        </div>
      </div>
      
      {userEvents.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-info">
            <i className="fas fa-info-circle me-2"></i>
            You haven't registered for any events yet.
          </div>
          <Link to="/" className="btn btn-primary mt-3">
            <i className="fas fa-search me-2"></i>
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {userEvents.map(event => (
            <div className="col" key={event._id}>
              <EventItem event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MyEvents.propTypes = {
  getUserEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(
  mapStateToProps,
  { getUserEvents }
)(MyEvents); 