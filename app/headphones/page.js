"use client"
import React, { useEffect } from 'react'
import Branding from '../components/Branding/Branding'
import data from '../../data.json'
import ProductSection from '../components/ProductSection/ProductSection'
import CardProduct from '../components/CardProduct/CardProduct'
import './headphones.scss'
const page = () => {
  useEffect(() => {
    document.title = "Audiophile - Headphones"
  }, [])

  const headphonesArray = data.filter((headphone) => {
    return headphone.category === "headphones"
  })
  return (
    <div className='page-main-container'>

      <div className="page-banner-container">
        <h1 className='page-title'>HEADPHONES</h1>
      </div>

      <div className="page-product-container">

        <div className="page-product-content">
          {headphonesArray.map((headphone, index) => (
            <CardProduct props={headphone} key={index} id={index}/>
          ))}
        </div>
      
        <ProductSection />

        <Branding />

      </div>
    </div>
  )
}

export default page