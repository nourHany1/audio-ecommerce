import React from 'react'
import './branding.scss'

const Branding = () => {
  return (


    <div className='branding'>
        <picture className="branding__picture__container">
            <source media="(max-width: 480px)" srcSet={'/starter-code/assets/shared/mobile/image-best-gear.jpg'} />
            <source media="(max-width: 768px)" srcSet={'/starter-code/assets/shared/tablet/image-best-gear.jpg'} />
            <img src={'/starter-code/assets/shared/desktop/image-best-gear.jpg'} alt="audiophile branding" />
        </picture>

        <div className="branding-text-container">
            <h2 className='branding-title'>
                BRINGING YOU THE <span className='branding-title-colored'>BEST</span> AUDIO GEAR
            </h2>
            <p className='branding-text'>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>
    </div>

  )
}

export default Branding