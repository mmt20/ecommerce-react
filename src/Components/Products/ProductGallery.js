import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import LeftButton from './LeftButton';
import RightButton from './RightButton';
import { Button } from 'react-bootstrap';

const ProductGallery = ({ images }) => {
  return (
    <div className="product-gallery">
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        showPlayButton={false}
        showThumbnails={true}
        thumbnailPosition="bottom"
        renderRightNav={(onClick, disabled) => (
          <Button
            onClick={onClick}
            disabled={disabled}
            variant="light"
            className="image-gallery-icon"
          >
            &rarr;
          </Button>
        )}
        renderLeftNav={(onClick, disabled) => (
          <Button
            onClick={onClick}
            disabled={disabled}
            variant="light"
            className="image-gallery-icon"
          >
            &larr;
          </Button>
        )}
      />
    </div>
  );
};

export default ProductGallery;
