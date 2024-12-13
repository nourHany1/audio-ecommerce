import React from 'react'
import ButtonFilled from '../ButtonFilled/ButtonFilled'
import './cardProduct.scss'
import { usePathname } from 'next/navigation'


const CardProduct = ({props, id}) => {
    const location = usePathname()
  return (
    <div className={location === "/speakers" ? "card-speaker" : "card"} id={id}>
        <picture className="card__picture">
            <source media="(max-width: 480px)" srcSet={props.categoryImage.mobile} />
            <source media="(max-width: 768px)" srcSet={props.categoryImage.tablet} />
            <img src={props.categoryImage.desktop} alt={props.name} />
        </picture>

        <div className="card-description-container">
            {props.new &&
                <p className="new-product">NEW PRODUCT</p>
            }
            <div className="card-description-content">
                <h3 className="card-title">{props.name}</h3>
                <p className="card-description">{props.description}</p>
                <ButtonFilled props={props}/>
            </div>
        </div>
    </div>
    )
}

export default CardProduct