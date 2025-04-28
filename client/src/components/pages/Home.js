import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import EventItem from '../events/EventItem';
import { getEvents } from '../../redux/actions/eventActions';

const Home = ({ event: { events, loading }, getEvents }) => {
  const [filter, setFilter] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (events) {
      filterEvents(filter);
    }
    // eslint-disable-next-line
  }, [events, filter]);

  const filterEvents = (filterType) => {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);
    
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    switch (filterType) {
      case 'week':
        setFilteredEvents(
          events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= oneWeekLater;
          })
        );
        break;
      case 'month':
        setFilteredEvents(
          events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today && eventDate <= oneMonthLater;
          })
        );
        break;
      default:
        setFilteredEvents(events);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

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
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-12 text-center">
          <div className="hero-section mb-5">
            <h1 className="display-4 mb-3" style={{ fontWeight: 'bold' }}>
              Discover Amazing Events
            </h1>
            <p className="lead text-muted px-md-5 mx-md-5">
              Join exciting events and connect with like-minded people. From workshops to gatherings,
              find the perfect event that matches your interests.
            </p>
            <div className="mt-4 d-none d-md-block">
              <div className="d-flex justify-content-center">
                {events.slice(0, 3).map((event, index) => (
                  <div 
                    key={index} 
                    className="badge bg-light text-dark mx-2 p-2"
                    style={{ 
                      transform: `rotate(${index - 1}deg)`,
                      boxShadow: 'var(--shadow-sm)',
                      borderRadius: 'var(--border-radius)'
                    }}
                  >
                    <i className="fas fa-calendar-alt me-1 text-primary"></i>
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="mb-0">
            <i className="fas fa-calendar-alt text-primary me-2"></i>
            Upcoming Events
          </h2>
        </div>
        <div className="col-md-6 text-md-end">
          <div className="d-flex justify-content-md-end align-items-center">
            <span className="me-2 text-muted">
              <i className="fas fa-filter me-1"></i> Filter:
            </span>
            <div className="btn-group">
              <button 
                className={`btn btn-sm btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`btn btn-sm btn-outline-primary ${filter === 'week' ? 'active' : ''}`}
                onClick={() => handleFilterChange('week')}
              >
                This Week
              </button>
              <button 
                className={`btn btn-sm btn-outline-primary ${filter === 'month' ? 'active' : ''}`}
                onClick={() => handleFilterChange('month')}
              >
                This Month
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="alert alert-info text-center p-5 mt-4">
          <i className="fas fa-info-circle fa-3x mb-3"></i>
          <h4>No events available for this filter</h4>
          <p className="mb-0">Try another filter or check back later for exciting new events!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredEvents.map(event => (
            <div className="col" key={event._id}>
              <EventItem 
                event={event} 
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="text-center mt-5 pt-3">
        <div className="card shadow-sm border-0 p-4 bg-light">
          <div className="card-body">
            <h3 className="card-title">Create Your Own Event</h3>
            <p className="card-text">
              Have an idea for an amazing event? Create and share it with the community!
            </p>
            <a href="/create-event" className="btn btn-primary">
              <i className="fas fa-plus-circle me-2"></i>
              Create Event
            </a>
          </div>
        </div>
      </div>
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