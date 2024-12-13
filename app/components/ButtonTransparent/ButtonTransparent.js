import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import './buttonTrans.scss'
const ButtonTransparent = ({props}) => {
  return (
    <Link href={`${props.category}/${props.slug}`} state={props}>
      <button className='buttonTransparent'>SEE PRODUCT</button>
    </Link>
  )
}

export default ButtonTransparent