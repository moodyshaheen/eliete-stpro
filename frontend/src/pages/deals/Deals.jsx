import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useCart } from '../../context/Cartcontext'
import { useFavorites } from '../../context/FavoritesContext'
import { FaHeart, FaSyncAlt, FaShoppingCart, FaStar } from 'react-icons/fa'
import { MdOutlineLocalFireDepartment } from 'react-icons/md'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import './deals.css'

function Deals() {
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const [loadingId, setLoadingId] = useState(null)

  // Filter products with discount > 10
  const dealsProducts = assets.products.filter(product => product.discount > 10)

  const handleAdd = async (product) => {
    setLoadingId(product.id)
    setTimeout(() => {
      addToCart(product)
      toast.success(`${product.title} added to cart!`)
      setLoadingId(null)
    }, 800)
  }

  const handleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
      toast.success(`${product.title} removed from favorites!`)
    } else {
      const added = addToFavorites(product)
      if (added) {
        toast.success(`${product.title} added to favorites!`)
      }
    }
  }

  return (
    <div className='deals-page'>
      <div className='deals-header'>
        <div className='deals-header-content'>
          <MdOutlineLocalFireDepartment className='fire-icon' />
          <h1>Hot Deals</h1>
          <p>Limited time offers - Don't miss out!</p>
        </div>
      </div>

      {dealsProducts.length === 0 ? (
        <div className='no-deals'>
          <p>No deals available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className='deals-container'>
          <div className='deals-grid'>
            {dealsProducts.map((product) => (
              <div className='deal-card' key={product.id}>
                <div className='deal-img-container'>
                  <img src={product.image} alt={product.title} className='deal-img' />
                  
                  <div className='deal-icons'>
                    <button 
                      className={`icon-btn ${isFavorite(product.id) ? 'favorited' : ''}`}
                      onClick={() => handleFavorite(product)}
                    >
                      <FaHeart />
                    </button>
                    <button className='icon-btn'><FaSyncAlt /></button>
                  </div>

                  <span className='deal-badge'>
                    {product.discount}% OFF
                  </span>
                </div>

                <div className='deal-info'>
                  <h3>{product.title}</h3>
                  
                  <div className='deal-rating'>
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} color='#f59e0b' />
                    ))}
                    <span className='rating-count'>({product.stock})</span>
                  </div>

                  <div className='deal-price-section'>
                    <p className='deal-price'>
                      ${product.price.toFixed(2)}
                    </p>
                    <span className='deal-old-price'>
                      ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className='add-to-cart-btn'
                    onClick={() => handleAdd(product)}
                    disabled={loadingId === product.id}
                  >
                    {loadingId === product.id ? (
                      <ClipLoader size={18} />
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Deals

