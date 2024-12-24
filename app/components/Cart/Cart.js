'use client';
import React, { forwardRef, useEffect, useState } from 'react';
import { useShoppingCart } from '../Context/contextProvider';
import Link from 'next/link';
import './cart.scss';
import Image from 'next/image';

const Cart = forwardRef(({handleCart}, ref) => {
  const { cart, totalPrice, numItems, clearShoppingCart, increaseItemsQty, decreaseItemsQty } = useShoppingCart();
  const [formattedPrice, setFormattedPrice] = useState('');
  const [formattedPrices, setFormattedPrices] = useState({});
  const [counters, setCounters] = useState({});

  useEffect(() => {
    const formatPrice = (price) => {
      return price > 999 ? `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : `$${price}`;
    };

    setFormattedPrice(formatPrice(totalPrice));

    const formatted = {};
    cart.forEach((item) => {
      formatted[item.id] = formatPrice(item.price);
    });
    setFormattedPrices(formatted);
  }, [totalPrice, cart]);

  useEffect(() => {
    const initialCounters = {};
    cart.forEach((item) => {
      initialCounters[item.id] = item.quantity || 1;
    });
    setCounters(initialCounters);
  }, [cart]);

  const handleCounterPlus = (id) => {
    setCounters((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleCounterMinus = (id) => {
    setCounters((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 0),
    }));
  };

  return (
    <div className='cart'>
      <div className="cart__overlay"></div>
      <div className="cart-global" ref={ref}>
        <div className={totalPrice !== 0 && numItems !== 0 ? "cart-container" : "cart-container empty"}>
          {totalPrice !== 0 && numItems !== 0 ? (
            <>
              <div className="cart-container__top">
                <p className="cart-container__title">CART ({numItems})</p>
                <button className='cart-container__remove' onClick={clearShoppingCart}>Remove all</button>
              </div>
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-products">
                    <Link href={`/${item.category}/products/${item.name}`} state={item}>
                      <div className="cart-products__item">
                        <Image width={60} height={60} src={item.image} alt={item.name} />
                        <div className="cart-products__content">
                          <p className="cart-products__content__title">{item.subName}</p>
                          <p className="cart-products__content__price">{formattedPrices[item.id]}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="counter-cart">
                      <button
                        className='counter-cart__minus'
                        onClick={() => {
                          decreaseItemsQty(item.id);
                          handleCounterMinus(item.id);
                        }}
                        disabled={counters[item.id] === 0}
                      >
                        -
                      </button>
                      <p>{counters[item.id]}</p>
                      <button
                        className='counter-cart__plus'
                        onClick={() => {
                          increaseItemsQty(item.id);
                          handleCounterPlus(item.id);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {totalPrice && (
                <>
                  <div className="cart-total">
                    <p className="cart-total__text">TOTAL</p>
                    <p className="cart-total__count">{formattedPrice}</p>
                  </div>
                  <Link className='cart-button-link' href='/checkout' onClick={handleCart} state={formattedPrice}>
                    <button className='cart-button'>CHECKOUT</button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <div className="empty-container">
              <p className="empty-container__text">
                <span>Oops...</span>
                <br />
                Your cart is empty
              </p>
              <svg className="empty-container__svg" width="23" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" fill="#000"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
Cart.displayName = 'Cart';
export default Cart;
