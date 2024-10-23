import React from 'react';
import { useParams } from 'react-router-dom';
import ViewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';
import AddToCartHook from '../../hook/cart/add-to-cart-hook';
import { Star, StarFill, Cart } from 'react-bootstrap-icons';
import { Button, Badge } from 'react-bootstrap';

const ProductsText = () => {
  const { id } = useParams();
  const { item } = ViewProductsDetalisHook(id);
  const { addToCartHandel } = AddToCartHook(id, item);

  return (
    <div className="product-details">
      <h2 className="mb-3">{item.name}</h2>
      <div className="d-flex align-items-center mb-3">
        <div className="me-2">
          {[...Array(5)].map((_, index) =>
            index < Math.round(item.ratingsQuantity) ? (
              <StarFill key={index} className="text-warning" />
            ) : (
              <Star key={index} className="text-warning" />
            )
          )}
        </div>
        <span className="text-muted">({item.ratingsQuantity} reviews)</span>
      </div>
      <p className="mb-3">
        <strong>Category:</strong> {item.category ? item.category.name : 'N/A'}
      </p>
      <p className="mb-3">
        <strong>Quantity:</strong> {item.quantity}
      </p>
      <h5 className="mb-3">Product Details</h5>
      <p className="mb-4">{item.description}</p>
      <div className="d-flex align-items-center mb-4">
        <h3 className="me-3 mb-0">{item.price} EGP</h3>
        <Button
          variant="dark"
          onClick={addToCartHandel}
          className="d-flex align-items-center"
        >
          <Cart className="me-2" /> Add to Cart
        </Button>
      </div>
      {item.quantity <= 5 && (
        <Badge bg="warning" text="dark">
          Only {item.quantity} left in stock - order soon
        </Badge>
      )}
    </div>
  );
};

export default ProductsText;
