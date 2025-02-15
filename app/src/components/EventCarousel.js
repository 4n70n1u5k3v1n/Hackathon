import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={styles.carousel}>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5].map((event) => (
          <div key={event} style={styles.eventCard}>
            <h3>Event {event}</h3>
            <p>Join this event to earn points!</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const styles = {
  carousel: {
    margin: '20px',
  },
  eventCard: {
    backgroundColor: '#e9ecef',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
};

export default EventCarousel;