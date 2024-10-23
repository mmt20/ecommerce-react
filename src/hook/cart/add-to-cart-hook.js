import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction';
import { addProductToCart } from './../../redux/actions/cartAction';

const AddToCartHook = (prdID, item) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  //add product to cart
  const addToCartHandel = async () => {
    setLoading(true);
    await dispatch(
      addProductToCart({
        productId: prdID,
      })
    );
    setLoading(false);
  };

  const res = useSelector((state) => state.cartReducer.addToCart);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify(
          'The product has been added to the cart successfully',
          'success'
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify('Log in first', 'warn');
      }
    }
  }, [loading]);

  return { addToCartHandel };
};

export default AddToCartHook;
