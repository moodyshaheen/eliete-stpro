import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "./cart.css";
import { useCart } from "../../context/Cartcontext";
import { useAuth } from "../../context/AuthContext";
import { orderAPI } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Cart() {
  const {
    items,
    subtotal,
    shipping,
    total,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const handleDelete = (id, title) => {
    setLoadingId(id);
    setTimeout(() => {
      removeFromCart(id);
      toast.success(`${title} removed from cart`);
      setLoadingId(null);
    }, 700);
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to place order');
      navigate('/profile');
      return;
    }

    if (items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setPlacingOrder(true);
    try {
      // Ensure all items have _id (MongoDB ObjectId)
      const orderItems = items.map(item => {
        // If item doesn't have _id, it might be from old local data
        // We need to fetch the product from backend to get the _id
        if (!item._id && item.id) {
          // This is a fallback - ideally all items should have _id
          // For now, we'll use the id and let backend handle it
          return {
            product: item.id, // Backend will try to find by _id or id
            quantity: item.quantity,
            price: item.price
          };
        }
        return {
          product: item._id || item.id,
          quantity: item.quantity,
          price: item.price
        };
      });

      const shippingAddress = user?.address || {
        street: '',
        city: '',
        country: '',
        zipCode: '',
        phone: user?.phone || ''
      };

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod: 'cash'
      };

      const response = await orderAPI.createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      // Navigate to orders page or profile
      navigate('/profile');
    } catch (error) {
      console.error('Order error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="cart-page">

      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-container">

        <div className="cart-items">
          {items.map((item) => {
            const itemId = item._id || item.id;
            return (
              <div className="cart-item" key={itemId}>
                <img src={item.image} alt={item.title} className="cart-img" />

                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p className="price">
                    ${item.price.toFixed(2)}{" "}
                    {item.oldPrice && (
                      <span className="old-price">${item.oldPrice.toFixed(2)}</span>
                    )}
                  </p>

                  <div className="quantity-box">
                    <button onClick={() => decreaseQty(itemId)}>-</button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => {
                        const stock = item.stock || 0;
                        if (item.quantity >= stock) {
                          toast.error(`Cannot add more. Only ${stock} items available in stock.`);
                          return;
                        }
                        increaseQty(itemId);
                      }}
                      disabled={item.quantity >= (item.stock || 0)}
                    >
                      +
                    </button>
                  </div>
                  {item.stock && (
                    <p className="stock-info">Stock: {item.stock - item.quantity} available</p>
                  )}
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(itemId, item.title)}
                  disabled={loadingId === itemId}
                >
                  {loadingId === itemId ? <ClipLoader size={18} /> : <FaTrashAlt />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            className="checkout-btn" 
            onClick={handlePlaceOrder}
            disabled={placingOrder || items.length === 0}
          >
            {placingOrder ? (
              <>
                <ClipLoader size={18} color="#fff" /> Placing Order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
          {!isAuthenticated && (
            <p className="login-prompt">
              Please <span onClick={() => navigate('/profile')}>login</span> to place order
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Cart;
