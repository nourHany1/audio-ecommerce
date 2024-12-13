import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import './button.scss'

const ButtonFilled = ({props}) => {
  return (
    <>
    <Link href={`/${props.category}/${props.slug}`} state={props}>
      <button className='buttonFilled'>SEE PRODUCT</button>
    </Link>
    </>
  )
}

export default ButtonFilled