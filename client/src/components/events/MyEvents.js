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

  // Group events by month
  const groupEventsByMonth = () => {
    const grouped = {};
    
    userEvents.forEach(event => {
      const date = new Date(event.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(event);
    });
    
    return grouped;
  };
  
  const groupedEvents = groupEventsByMonth();

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-0 display-5">
            <i className="fas fa-calendar-check text-primary me-3"></i>
            My Events
          </h1>
          <p className="text-muted lead mt-2">
            Events you've registered to attend
          </p>
        </div>
        <div className="col-md-4 text-md-end d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
          <Link to="/" className="btn btn-outline-primary me-2">
            <i className="fas fa-search me-2"></i>
            Find Events
          </Link>
          <Link to="/create-event" className="btn btn-primary">
            <i className="fas fa-plus me-2"></i>
            Create
          </Link>
        </div>
      </div>
      
      {userEvents.length === 0 ? (
        <div className="row mt-5">
          <div className="col-md-8 mx-auto text-center">
            <div className="card shadow-sm border-0 p-5">
              <div className="card-body">
                <i className="fas fa-calendar-times fa-4x text-muted mb-4"></i>
                <h3>You haven't registered for any events yet</h3>
                <p className="text-muted mb-4">
                  Explore upcoming events and register for ones that interest you.
                </p>
                <Link to="/" className="btn btn-primary btn-lg">
                  <i className="fas fa-search me-2"></i>
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex align-items-center mb-4 mt-5">
            <div className="stats-container d-flex justify-content-between bg-light rounded p-3 w-100 shadow-sm">
              <div className="text-center px-3">
                <h3 className="mb-1">{userEvents.length}</h3>
                <p className="text-muted mb-0">Total Events</p>
              </div>
              <div className="text-center px-3 border-start border-end">
                <h3 className="mb-1">
                  {userEvents.filter(e => new Date(e.date) > new Date()).length}
                </h3>
                <p className="text-muted mb-0">Upcoming</p>
              </div>
              <div className="text-center px-3">
                <h3 className="mb-1">
                  {userEvents.filter(e => new Date(e.date) < new Date()).length}
                </h3>
                <p className="text-muted mb-0">Past</p>
              </div>
            </div>
          </div>
          
          {Object.entries(groupedEvents).map(([monthYear, events]) => (
            <div key={monthYear} className="mb-5">
              <h4 className="mb-4 mt-4 border-bottom pb-2">
                <i className="far fa-calendar-alt me-2 text-primary"></i>
                {monthYear}
              </h4>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {events.map(event => (
                  <div className="col" key={event._id}>
                    <EventItem event={event} />
                  </div>
                ))}
              </div>
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