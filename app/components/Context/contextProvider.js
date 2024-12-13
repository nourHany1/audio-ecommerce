'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ShoppingCart = createContext();

const Provider = ({ children }) => {
  // Initialize cart as empty on the server, load from localStorage on the client
  const [cart, setCart] = useState([]);
  const [numItems, setNumItems] = useState(0);

  // Load the cart from localStorage once the component mounts (on the client side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('shoppingCart');
      try {
        setCart(storedCart ? JSON.parse(storedCart) : []);
      } catch (error) {
        console.error('Error parsing stored cart', error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && cart.length > 0) {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
  }, [cart]);

  // Update number of items whenever the cart changes
  useEffect(() => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    setNumItems(totalItems);
  }, [cart]);


  const addItemsIntoShoppingCart = (product) => {
    setCart((currItems) => {
      const index = currItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        return currItems.map((item, i) => {
          if (i === index) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
      } else {
        return [...currItems, product];
      }
    });
  };

  const getItemsQuantity = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseItemsQty = (id) => {
    setCart((currItems) => {
      return currItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseItemsQty = (id) => {
    setCart((currItems) => {
      const item = currItems.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          return currItems.filter((item) => item.id !== id);
        } else {
          return currItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        }
      }
      return currItems;
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => currItems.filter((item) => item.id !== id));
    localStorage.removeItem("shoppingCart")
  };

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const clearShoppingCart = () => {
    setCart([]);
    localStorage.clear("shoppingCart")
  };

  const salesTaxRate = 0.2;
  const shippingCost = 50;
  const totalWithTax = totalPrice + totalPrice * salesTaxRate;
  const grandTotal = totalPrice + shippingCost;

  return (
    <ShoppingCart.Provider
      value={{
        cart,
        addItemsIntoShoppingCart,
        getItemsQuantity,
        increaseItemsQty,
        decreaseItemsQty,
        removeItem,
        clearShoppingCart,
        numItems,
        totalPrice,
        cartSummary: {
          totalPrice,
          salesTaxRate,
          shippingCost,
          totalWithTax,
          grandTotal,
        }
      }}
    >
      {children}
    </ShoppingCart.Provider>
  );
};

export default Provider;

export const useShoppingCart = () => {
  return useContext(ShoppingCart);
};
