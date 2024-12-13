'use client';
import React, { useEffect, useState } from 'react';
import ProductSection from '../ProductSection/ProductSection';
import Branding from '../Branding/Branding';
import ButtonFilled from '../ButtonFilled/ButtonFilled';
import { useRouter } from 'next/navigation';
import './productDetails.scss';
import { useShoppingCart } from '../Context/contextProvider';
import Cart from '../Cart/Cart';
import formatPrice from '../formatPrice/formatPrice';


const ProductDetails = ({ products }) => {
  const { addItemsIntoShoppingCart, numItems } = useShoppingCart();
  const [formattedPrice, setFormattedPrice] = useState([]);
  const [counter, setCounter] = useState(1);
  const router = useRouter();

  useEffect(() => {
    document.title = `Audiophile - ${products[0].subName}`;
  }, [products]);



  const handleGoBack = () => {
    router.back();
  };

  const handleCounterPlus = () => {
    setCounter(counter + 1);
  };

  const handleCounterMinus = () => {
    setCounter(counter - 1);
  };

  const handleCart = (product) => {
    const productToAdd = {
      ...product,
      quantity: counter,
    };
    addItemsIntoShoppingCart(productToAdd);
  };
  
  return (
    <div className='products'>
      <div className="go-back-button">
        <button onClick={handleGoBack}>
          Go Back
        </button>
      </div>

      {products.map((product, index) => (
        <div key={index} className="product-container">
          <div className="item__product">
            <picture className="item__product__picture">
              <source media="(max-width: 480px)" srcSet={product.image.mobile} />
              <source media="(max-width: 768px)" srcSet={product.image.tablet} />
              <img src={product.image.desktop} alt={product.name} />
            </picture>

            <div className="item-description-container">
              {product.new && <p className="new">NEW PRODUCT</p>}
              <div className="item-description-content">
                <h3 className="item-title">{product.name}</h3>
                <p className="item-description">{product.description}</p>
                <p className="price"> {formatPrice(product.price)}</p>

                <div className="add-cart-container">
                  <div className="counter">
                    <button className='counter__minus' onClick={handleCounterMinus} disabled={counter === 1}> - </button>
                    <p>{counter}</p>
                    <button className='counter__plus' onClick={handleCounterPlus}> + </button>
                  </div>

                  <button className="add-cart-button" onClick={() => handleCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image.desktop,
                    slug: product.slug,
                    category: product.category,
                    subName: product.subName,
                  })}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card-product-content">
            <div className="features">
              <h5 className='features__title'>FEATURES</h5>
              <p className='features__text'>{product.features}</p>
            </div>

            <div className="inside">
              <h5 className='inside__title'>IN THE BOX</h5>
              <ul className='inside__include'>
                {product.includes.map((items, index) => (
                  <li key={index} className='inside__list'>
                    <span className="inside__list__quantity">{items.quantity}x</span>
                    <span className="inside__list__item">{items.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="gallery">
            <div className="gallery__left">
              <picture className="gallery__top">
                <img src={product.gallery.first.desktop} alt="" />
              </picture>
              <picture className="gallery__bottom">
                <img src={product.gallery.second.desktop} alt="" />
              </picture>
            </div>
            <div className="gallery__right">
              <picture className="gallery__picture">
                <img src={product.gallery.third.desktop} alt="" />
              </picture>
            </div>
          </div>

          <div className="also-like">
            <h5 className='also-like__title'>YOU MAY ALSO LIKE</h5>
            <div className="also-like__content">
              {product.others.map((item, index) => (
                <div key={index} className="also-like__card">
                  <picture>
                    <source media="(max-width: 480px)" srcSet={item.image.mobile} />
                    <source media="(max-width: 768px)" srcSet={item.image.tablet} />
                    <img src={item.image.desktop} alt={item.name} />
                  </picture>
                  <h5 className='also-like__text'>{item.name}</h5>
                  <ButtonFilled props={item} />
                </div>
              ))}
            </div>
          </div>

          <ProductSection />
          <Branding />
        </div>
      ))}
    </div>
  );
};

export default ProductDetails;
