import React, { useContext, useEffect, useState } from 'react'
import './orderConfirmation.scss'
import Link from 'next/link'
import formatPrice from '../formatPrice/formatPrice';
import Image from 'next/image';

export default function OrderConfirmation({grandPriceFormatted,confirmationActive}) {


    const [otherItemsActive, setOtherItemsActive] = useState(false)

    const storage = JSON.parse(localStorage.getItem("shoppingCart"))
    
    const product = storage[0]
    const totalItems = storage.length - 1
    

    useEffect(() => {
        if(confirmationActive) {
            document.body.style.overflow = 'hidden';
        }
    })

  return (
    <div className='order-confirmation'>
        <div className="order-confirmation__overlay"></div>
        <div className="order-container" >
            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><circle fill="#D87D4A" cx="32" cy="32" r="32"/><path stroke="#FFF" strokeWidth="4" d="m20.754 33.333 6.751 6.751 15.804-15.803"/></g></svg>
            
            <div className="order-content">
                <h1 className="order-content__title">THANK YOU <br></br> FOR YOUR ORDER</h1>
                <p className="order-content__text">You will receive an email confirmation shortly.</p>
            </div>
            
            {!otherItemsActive ? 
                <div className="order-summary">

                    <div className="order-summary__products">
                        <div className="order-summary__products__container">
                        
                            <div className="order-summary__products__content__container">

                                <Image width={70} height={70} src={product.image} alt={product.name} />
                                <div className="order-summary__products__content">
                                    <p className="order-summary__products__content__name">{product.subName}</p>
                                    <p className="order-summary__products__content__price"> {formatPrice(product.price)}</p>
                                </div>
                            </div>
                            <p className="order-summary__products__content__quantity">x{product.quantity}</p>
                        </div>
                        {totalItems >= 1 &&
                            <>
                                <div className="summary-border" ></div>
                                <p className='other-items' onClick={() => setOtherItemsActive(true)}>and {totalItems} other item(s)</p>
                            </>
                        }
                    </div>
                    <div className="order-summary__grand">                   
                        <p className="order-summary__grand__title">GRAND TOTAL</p>
                        <p className="order-summary__grand__price">{formatPrice(grandPriceFormatted)}</p>
                    </div>
                
                </div>
            
            :

                <div className="order-summary">

                    <div className="order-summary__products">
                        {storage.map((item, index) => (
                            <div key={index} className="order-summary__products__container">
                                <div className="order-summary__products__content__container">

                                    <Image src={item.image} alt={item.name} />
                                    <div className="order-summary__products__content">
                                        <p className="order-summary__products__content__name">{item.subName}</p>
                                        <p className="order-summary__products__content__price">{formatPrice(item.price)}</p>
                                    </div>
                                </div>
                                <p className="order-summary__products__content__quantity">x{item.quantity}</p>
                            </div>

                        ))}
                        {totalItems >= 1 &&
                            <>
                                <div className="summary-border" ></div>
                                <p className='other-items' onClick={() => setOtherItemsActive(false)}>View less</p>
                            </>
                        }
                    </div>
                    <div className="order-summary__grand order-summary__order__active">                   
                        <p className="order-summary__grand__title">GRAND TOTAL</p>
                        <p className="order-summary__grand__price"> {formatPrice(grandPriceFormatted)}</p>
                    </div>
            
                </div>

            }

            <Link href={'/'}>
                <button className='order-summary__button'>BACK TO HOME</button>
            </Link>
        </div>
    </div>
  )
}
