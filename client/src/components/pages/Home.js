import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import EventItem from '../events/EventItem';
import { getEvents } from '../../redux/actions/eventActions';

const Home = ({ event: { events, loading }, getEvents }) => {
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

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
          <h1 className="text-center mb-4">Upcoming Events</h1>
          <p className="lead text-center">Discover and register for exciting events!</p>
        </div>
      </div>
      
      {events.length === 0 ? (
        <div className="alert alert-info text-center">
          <i className="fas fa-info-circle me-2"></i>
          No events available at the moment.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events.map(event => (
            <div className="col" key={event._id}>
              <EventItem 
                event={event}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvents })(Home); 