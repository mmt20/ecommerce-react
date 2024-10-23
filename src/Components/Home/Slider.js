import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import slider1 from '../../images/silder3.jpg';
import slider2 from '../../images/silder2.jpg';
import slider3 from '../../images/silder3.jpg';
import styles from './Slider.module.css'; // Import the CSS Module

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={slider1} alt="First slide" />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>New This Week</h3>
          <p>Discover New Art Our Curators Love Every Week</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={slider2} alt="Second slide" />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>New This Week</h3>
          <p>Discover New Art Our Curators Love Every Week</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img className="d-block w-100" src={slider3} alt="Third slide" />
        <Carousel.Caption className={styles.carouselCaption}>
          <h3>New This Week</h3>
          <p>Discover New Art Our Curators Love Every Week</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
