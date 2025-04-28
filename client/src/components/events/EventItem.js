import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { registerForEvent, cancelRegistration, getEvents } from '../../redux/actions/eventActions';

const EventItem = ({ 
  event, 
  auth: { user }, 
  registerForEvent, 
  cancelRegistration,
  getEvents
}) => {
  const { _id, title, description, date, createdBy, attendees } = event;

  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleString();
  const eventDate = new Date(date);
  
  // Calculate days remaining until the event
  const today = new Date();
  const diffTime = eventDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate if the event is in the past
  const isPastEvent = eventDate < today;

  const handleRegisterForEvent = async () => {
    try {
      await registerForEvent(_id);
      // Refresh the events list to update UI
      getEvents();
      toast.success('🎉 Successfully registered for the event!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('😓 Failed to register for event', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCancelRegistration = async () => {
    try {
      if (await cancelRegistration(_id, user._id)) {
        // Refresh the events list to update UI
        getEvents();
        toast.info('Registration canceled successfully', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      toast.error('Failed to cancel registration', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isUserRegistered = () => {
    return attendees && user && attendees.some(attendee => 
      typeof attendee === 'object' 
        ? attendee._id === user._id 
        : attendee === user._id
    );
  };

  // Get badge class based on days remaining
  const getBadgeClass = () => {
    if (isPastEvent) return 'bg-danger';
    if (diffDays <= 3) return 'bg-warning text-dark';
    if (diffDays <= 7) return 'bg-info text-white';
    return 'bg-success text-white';
  };

  // Get badge text based on days remaining
  const getBadgeText = () => {
    if (isPastEvent) return 'Past Event';
    if (diffDays === 0) return 'Today!';
    if (diffDays === 1) return 'Tomorrow!';
    return `${diffDays} days left`;
  };

  return (
    <div className="card h-100 shadow-sm event-card">
      <div className="card-header bg-gradient-primary d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0 text-white">{title}</h5>
        <span className={`badge ${getBadgeClass()}`}>
          {getBadgeText()}
        </span>
      </div>
      <div className="card-body">
        <p className="card-text">{description}</p>
        
        <div className="d-flex align-items-center mb-3">
          <i className="far fa-calendar-alt me-2 text-primary"></i>
          <small className="text-muted">
            {formattedDate}
          </small>
        </div>
        
        <div className="d-flex align-items-center mb-3">
          <i className="far fa-user me-2 text-primary"></i>
          <small className="text-muted">
            Created by: {createdBy.name}
          </small>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center">
            <i className="fas fa-users me-2 text-primary"></i>
            <small className="text-muted">
              {attendees.length} {attendees.length === 1 ? 'person' : 'people'} attending
            </small>
          </div>
          {attendees.length > 0 && 
            <div className="mt-2">
              <div className="attendee-avatars d-flex">
                {attendees.slice(0, 5).map((attendee, index) => (
                  <div 
                    key={index} 
                    className="attendee-avatar"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: `hsl(${index * 40}, 70%, 60%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      marginRight: '-10px',
                      border: '2px solid white',
                      zIndex: 5 - index
                    }}
                  >
                    {typeof attendee === 'object' && attendee.name
                      ? attendee.name.charAt(0) 
                      : '?'}
                  </div>
                ))}
                {attendees.length > 5 && (
                  <div 
                    className="attendee-avatar"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: '#6c757d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      marginRight: '-10px',
                      border: '2px solid white'
                    }}
                  >
                    +{attendees.length - 5}
                  </div>
                )}
              </div>
            </div>
          }
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
          <div className="text-muted">
            <i className="fas fa-hourglass-end me-2"></i>
            Registration closed
          </div>
        )}
      </div>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  registerForEvent: PropTypes.func.isRequired,
  cancelRegistration: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerForEvent, cancelRegistration, getEvents }
)(EventItem); 