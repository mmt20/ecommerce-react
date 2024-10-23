import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../redux/actions/categoryAction';
import ViewSearchProductsHook from './../products/view-search-products-hook';

const SidebarSearchHook = () => {
  const { getProduct } = ViewSearchProductsHook();
  const dispatch = useDispatch();
  //when first load
  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCategory(8));
      get();
    };
  }, []);

  //to get state from redux
  const allCat = useSelector((state) => state.allCategory.category);

  //to get category
  let category = [];
  if (allCat.data) category = allCat.data;

  var queryCat = '';

  const [catChecked, setCatChecked] = useState([]);

  //when user press any category
  const clickCategory = (e) => {
    let value = e.target.value;
    if (value === '0') {
      setCatChecked([]);
    } else {
      if (e.target.checked === true) {
        setCatChecked([...catChecked, value]);
      } else if (e.target.checked === false) {
        const newArry = catChecked.filter((e) => e !== value);
        setCatChecked(newArry);
      }
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    queryCat = catChecked.map((val) => 'category[in][]=' + val).join('&');
    localStorage.setItem('catCecked', queryCat);
    setTimeout(() => {
      getProduct();
    }, 1000);
  }, [catChecked]);

  const [From, setPriceFrom] = useState(0);
  const [To, setToFrom] = useState(0);

  const priceFrom = (e) => {
    localStorage.setItem('priceFrom', e.target.value);

    setPriceFrom(e.target.value);
  };
  const priceTo = (e) => {
    localStorage.setItem('priceTo', e.target.value);
    setToFrom(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      getProduct();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [From, To]);

  return { category, clickCategory, priceFrom, priceTo };
};

export default SidebarSearchHook;
