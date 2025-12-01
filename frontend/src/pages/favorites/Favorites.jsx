import React, { useState } from 'react'
import { useFavorites } from '../../context/FavoritesContext'
import { useCart } from '../../context/Cartcontext'
import { FaHeart, FaShoppingCart, FaStar, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import './favorites.css'

function Favorites() {
  const { items, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()
  const [loadingId, setLoadingId] = useState(null)
  const [cartLoadingId, setCartLoadingId] = useState(null)

  const handleRemove = (product) => {
    setLoadingId(product.id)
    setTimeout(() => {
      removeFromFavorites(product.id)
      toast.success(`${product.title} removed from favorites!`)
      setLoadingId(null)
    }, 700)
  }

  const handleAddToCart = (product) => {
    setCartLoadingId(product.id)
    setTimeout(() => {
      addToCart(product)
      toast.success(`${product.title} added to cart!`)
      setCartLoadingId(null)
    }, 800)
  }

  return (
    <div className='favorites-page'>
      <div className='favorites-header'>
        <FaHeart className='heart-icon' />
        <h1>My Favorites</h1>
        <p>Your saved items</p>
      </div>

      {items.length === 0 ? (
        <div className='empty-favorites'>
          <FaHeart className='empty-heart' />
          <h2>No favorites yet</h2>
          <p>Start adding products to your favorites list!</p>
          <Link to='/products' className='browse-btn'>
            Browse Products
          </Link>
        </div>
      ) : (
        <div className='favorites-container'>
          <div className='favorites-grid'>
            {items.map((product) => {
              // معالجة مسار الصورة
              const productImage = product.image || product.images?.[0] || '';
              const imageUrl = productImage.startsWith('http') 
                ? productImage 
                : productImage.startsWith('/upload') 
                  ? `http://localhost:4000${productImage}`
                  : productImage ? `http://localhost:4000/upload/${productImage}` : '';
              
              return (
              <div className='favorite-card' key={product.id}>
                <div className='favorite-img-container'>
                  <img src={imageUrl} alt={product.title} className='favorite-img' />
                  
                  <div className='favorite-badges'>
                    {product.discount > 10 && <span className='badge sale'>Sale</span>}
                    {product.discount <= 10 && product.discount > 5 && <span className='badge new'>New</span>}
                    {product.discount <= 5 && <span className='badge popular'>Popular</span>}
                  </div>

                  <button
                    className='remove-favorite-btn'
                    onClick={() => handleRemove(product)}
                    disabled={loadingId === product.id}
                    title='Remove from favorites'
                  >
                    {loadingId === product.id ? (
                      <ClipLoader size={16} color='#fff' />
                    ) : (
                      <FaTrashAlt />
                    )}
                  </button>
                </div>

                <div className='favorite-info'>
                  <h3>{product.title}</h3>
                  
                  <div className='favorite-rating'>
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} color='#f59e0b' size={14} />
                    ))}
                    <span className='rating-count'>({product.stock})</span>
                  </div>

                  <div className='favorite-price-section'>
                    <p className='favorite-price'>
                      ${product.price.toFixed(2)}
                    </p>
                    {product.discount > 0 && (
                      <span className='favorite-old-price'>
                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    className='add-to-cart-fav-btn'
                    onClick={() => handleAddToCart(product)}
                    disabled={cartLoadingId === product.id}
                  >
                    {cartLoadingId === product.id ? (
                      <ClipLoader size={18} />
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            )})}
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites

