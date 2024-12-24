"use client"
import React, { useEffect } from 'react'
import Branding from '../components/Branding/Branding'
import data from '../../data.json'
import ProductSection from '../components/ProductSection/ProductSection'
import CardProduct from '../components/CardProduct/CardProduct'
import '../headphones/headphones.scss'
const Page = () => {
  useEffect(() => {
    document.title = "Audiophile - Earphones"
  }, [])

  const earphonesArray = data.filter((earphones) => {
    return earphones.category === "earphones"
  })
  return (
    <div className='page-main-container'>

    <div className="page-banner-container">
      <h1 className='page-title'>EARPHONES</h1>
    </div>

    <div className="page-product-container">

      <div className="page-product-content">
        {earphonesArray.map((earphone, index) => (
          <CardProduct props={earphone} key={index} id={index}/>
          ))}
      </div>
    
      <ProductSection />

      <Branding />

    </div>
  </div>
  )
}

export default Page