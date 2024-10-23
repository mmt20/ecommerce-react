import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  getAllProductsSearch,
  getAllProductsPage,
} from '../../redux/actions/productsAction';

const ViewSearchProductsHook = () => {
  let limit = 6;
  let pricefromString = '',
    priceToString = '';
  let word = '',
    queryCat = '',
    priceTo = '',
    priceFrom = '';

  const dispatch = useDispatch();
  const getProduct = async () => {
    getStorge();
    sortData();
    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${pricefromString}${priceToString}`
      )
    );
  };

  const getStorge = () => {
    if (localStorage.getItem('searchWord') != null)
      word = localStorage.getItem('searchWord');
    if (localStorage.getItem('catCecked') != null)
      queryCat = localStorage.getItem('catCecked');
    if (localStorage.getItem('priceTo') != null)
      priceTo = localStorage.getItem('priceTo');
    if (localStorage.getItem('priceFrom') != null)
      priceFrom = localStorage.getItem('priceFrom');

    if (priceFrom === '' || priceFrom <= 0) {
      pricefromString = '';
    } else {
      pricefromString = `&price[gt]=${priceFrom}`;
    }

    if (priceTo === '' || priceTo <= 0) {
      priceToString = '';
    } else {
      priceToString = `&price[lte]=${priceTo}`;
    }
  };

  useEffect(() => {
    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const allProducts = useSelector((state) => state.allproducts.allProducts);

  let items = [];
  let results = 0;
  let pagination = [];
  try {
    if (allProducts.data) items = allProducts.data;
    else items = [];
  } catch (e) {}
  try {
    if (allProducts.paginationResult)
      pagination = allProducts.paginationResult.numberOfPages;
    else pagination = [];
  } catch (e) {}
  try {
    if (allProducts.results) results = allProducts.results;
    else results = 0;
  } catch (e) {}

  const onPress = async (page) => {
    getStorge();
    sortData();
    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${pricefromString}${priceToString}`
      )
    );
  };

  let sortType = '';
  let sort;

  ///when user chooses sort type
  const sortData = () => {
    if (localStorage.getItem('sortType') !== null) {
      sortType = localStorage.getItem('sortType');
    } else {
      sortType = '';
    }

    if (sortType === 'price_low_to_high') sort = 'price';
    else if (sortType === 'price_high_to_low') sort = '-price';
    else if (sortType === '') sort = '';
    else if (sortType === 'most_sold') sort = '-sold';
    else if (sortType === 'highest_rated') sort = '-quantity';
  };

  return { items, pagination, onPress, getProduct, results };
};

export default ViewSearchProductsHook;
