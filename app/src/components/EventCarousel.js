import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventCarousel.css'; 
import { getAllEvents } from '../api/events';
import LoadingSpinner from '../components/LoadingSpinner';

const EventCarousel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data.data.slice(0, 5)); 
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
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!events.length) {
    return <div>No events found</div>;
  }

  return (
      <div className="carousel-container">
        <Slider {...settings}>
          {events.map((event) => (
            // <a
            // key={event.event_id}
            // href={`/events`} // Change to the actual event link
            // className="event-card-link">
              <div
                key={event.event_id}
                className="event-card"
                onClick={() => navigate(`/events`)}
                style={{ cursor: "pointer" }}>
                <h3>{event.event_name}</h3>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(event.event_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{' '}
                  {new Date(`1970-01-01T${event.event_time}`).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                  })}
                </p>
                <p>
                  <strong>Location:</strong> {event.event_location}
                </p>
              </div>
            // </a>
          ))}
        </Slider>
      </div>
  );
};

export default EventCarousel;
