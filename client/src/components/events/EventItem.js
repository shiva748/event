import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { registerForEvent, cancelRegistration } from '../../redux/actions/eventActions';

const EventItem = ({ 
  event, 
  auth: { user }, 
  registerForEvent, 
  cancelRegistration 
}) => {
  const { _id, title, description, date, createdBy, attendees } = event;

  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleString();

  const handleRegisterForEvent = async () => {
    try {
      await registerForEvent(_id);
      toast.success('Registered for event successfully');
    } catch (err) {
      toast.error('Failed to register for event');
    }
  };

  const handleCancelRegistration = async () => {
    try {
      if (await cancelRegistration(_id, user._id)) {
        toast.success('Registration canceled successfully');
      }
    } catch (err) {
      toast.error('Failed to cancel registration');
    }
  };

  const isUserRegistered = () => {
    return attendees && user && attendees.some(attendee => 
      typeof attendee === 'object' 
        ? attendee._id === user._id 
        : attendee === user._id
    );
  };

  // Calculate if the event is in the past
  const isPastEvent = new Date(date) < new Date();

  return (
    <div className="card h-100 shadow-sm">
      {isPastEvent && (
        <div className="card-header bg-secondary text-white">
          <span className="badge bg-danger">Past Event</span>
        </div>
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        
        <div className="mb-3">
          <small className="text-muted">
            <i className="far fa-calendar-alt me-2"></i>
            {formattedDate}
          </small>
        </div>
        
        <div className="mb-3">
          <small className="text-muted">
            <i className="far fa-user me-2"></i>
            Created by: {createdBy.name}
          </small>
        </div>
        
        <div className="mb-3">
          <small className="text-muted">
            <i className="fas fa-users me-2"></i>
            {attendees.length} {attendees.length === 1 ? 'person' : 'people'} attending
          </small>
        </div>
      </div>
      
      <div className="card-footer bg-white border-top-0 d-flex justify-content-end">
        {user && !isUserRegistered() && !isPastEvent && (
          <button 
            className="btn btn-outline-success" 
            onClick={handleRegisterForEvent}
          >
            <i className="fas fa-check-circle me-2"></i>
            Register
          </button>
        )}
        
        {user && isUserRegistered() && !isPastEvent && (
          <button 
            className="btn btn-outline-danger" 
            onClick={handleCancelRegistration}
          >
            <i className="fas fa-times-circle me-2"></i>
            Cancel Registration
          </button>
        )}
        
        {isPastEvent && (
          <span className="text-muted">
            <i className="fas fa-hourglass-end me-2"></i>
            Registration closed
          </span>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerForEvent: PropTypes.func.isRequired,
  cancelRegistration: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerForEvent, cancelRegistration }
)(EventItem); 