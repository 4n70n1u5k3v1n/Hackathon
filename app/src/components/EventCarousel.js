import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventCarousel.css'; // Import the CSS file
import { getAllEvents } from '../api/events';

const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents().then(() => console.log('Events fetched'));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (!events.length) {
    return <div>No events found</div>;
  }

  return (
      <div className="carousel-container">
        <Slider {...settings}>
          {events.map((event) => (
              <div key={event.event_id} className="event-card">
                <h3>{event.event_name}</h3>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {event.event_time}
                </p>
                <p>
                  <strong>Location:</strong> {event.event_location}
                </p>
              </div>
          ))}
        </Slider>
      </div>
  );
};

export default EventCarousel;
