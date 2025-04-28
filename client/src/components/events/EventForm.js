import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { addEvent } from '../../redux/actions/eventActions';

const EventForm = ({ addEvent }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: ''
  });

  const { title, description, date } = eventData;

  const onChange = e => 
    setEventData({ ...eventData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    
    const success = await addEvent(eventData);
    
    if (success) {
      toast.success('Event created successfully');
      navigate('/');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">Create New Event</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Event Title</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-heading"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={title}
                      onChange={onChange}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Event Description</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-align-left"></i>
                    </span>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={description}
                      onChange={onChange}
                      placeholder="Enter event description"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="date" className="form-label">Event Date and Time</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-calendar-alt"></i>
                    </span>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="date"
                      name="date"
                      value={date}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <small className="form-text text-muted">
                    Event date must be in the future
                  </small>
                </div>
                
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-plus-circle me-2"></i>
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired
};

export default connect(null, { addEvent })(EventForm); 