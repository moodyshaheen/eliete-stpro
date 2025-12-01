import React from 'react'
import Cat from '../../commponts/category/Cat'
import './products.css'

function Products() {
  return (
    <div className='products-page'>
      <div className='products-header'>
        <h1>Our Products</h1>
        <p>Discover our wide range of premium products</p>
      </div>
      <Cat />
    </div>
  )
}

export default Products

