import React from 'react'

function Item({item}) {
  return (
    <div className='td'>
        <li>{item.name}</li>
        <li>{item.unitPrice} $</li>
    </div>
  )
}

export default Item