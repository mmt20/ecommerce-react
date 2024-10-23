import React from 'react';
import Slider from './../../Components/Home/Slider';
import SubTitle from '../../Components/Utility/SubTitle';
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductContainer from '../../Components/Products/CardProductsContainer';

import ViewHomeProductsHook from '../../hook/products/view-home-products-hook';

const HomePage = () => {
  const [items] = ViewHomeProductsHook();
  return (
    <div className="font" style={{ minHeight: '670px' }}>
      <Slider />
      <SubTitle />
      <HomeCategory />
      <CardProductContainer
        products={items}
        title="Products"
        btntitle="More"
        pathText="/products"
      />
    </div>
  );
};

export default HomePage;
