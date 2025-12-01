import { createContext, useContext, useReducer, useEffect } from "react"; 
// Import React functions used for creating context, state management, and side effects

// Create Context
const CartContext = createContext(); 
// Creates a context to share cart data across the app

// Reducer Logic
const cartReducer = (state, action) => { 

  // Handles all cart operations based on the action type
  switch (action.type) {

       case "ADD_TO_CART": 
      // Add a new product OR increase quantity if product already exists

      // Use _id as primary identifier, fallback to id
      const itemId = action.payload._id || action.payload.id;
      const exists = state.items.find((item)=> {
        const existingId = item._id || item.id;
        return existingId === itemId;
      })
      // Check if item already exists in the cart

      // Get stock from payload (original stock from product)
      const stock = action.payload.stock || 0;

      if (exists) { 
        // If exists → increase its quantity only if stock allows
        const currentQty = exists.quantity;
        if (currentQty >= stock) {
          // Cannot add more - stock limit reached
          return state; // Return unchanged state
        }
        return {
          ...state, 
          // Keep the rest of the state unchanged
          items: state.items.map((item) => {
            const existingId = item._id || item.id;
            return existingId === itemId
              ? { ...item, quantity: item.quantity + 1 } 
              // Increase quantity
              : item
          }),
        };
      }

      // Check if stock is available for new item
      if (stock <= 0) {
        return state; // Cannot add - out of stock
      }

      return {
        ...state, 
        // Add product as a new item with quantity = 1
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };

   case "REMOVE_FROM_CART": 
      // Remove item by its ID
      return {
        ...state,
        items: state.items.filter((item) => {
          const itemId = item._id || item.id;
          return itemId !== action.payload;
        }), 
        // Keep items except the removed one
      };

    case "INCREASE_QTY": 
      // Increase quantity for a specific product (check stock limit)
      return {
        ...state,
        items: state.items.map((item) => {
          const itemId = item._id || item.id;
          if (itemId === action.payload) {
            // Check if we can increase quantity (stock limit)
            const stock = item.stock || 0;
            if (item.quantity >= stock) {
              // Cannot increase - stock limit reached
              return item;
            }
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "DECREASE_QTY": 
      // Decrease quantity, remove item if quantity becomes 0
      return {
        ...state,
        items: state.items
          .map((item) => {
            const itemId = item._id || item.id;
            return itemId === action.payload
              ? { ...item, quantity: item.quantity - 1 } 
              // Reduce quantity
              : item
          })
          .filter((item) => item.quantity > 0), 
          // Remove items with 0 quantity
      };

    case "CLEAR_CART": 
      // Empty the cart completely
      return { ...state, items: [] };

    default:
      return state; 
      // Return unchanged state if action is unknown
  }

      
};

// Provider Component
export const CartProvider = ({ children }) => {
  // initial cart loaded from localStorage OR empty array
 
const savedCart = localStorage.getItem("cartItems"); 
// Get the saved cart from localStorage

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [], 
  // If savedCart exists, parse it. Otherwise, start with empty array
};
   const [state, dispatch] = useReducer(cartReducer, initialState); 
  // useReducer hook for managing cart state based on actions

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items)); 
    // Sync cart with localStorage
  }, [state.items]); 
  // Runs whenever cart items change
  

  // Cart Calculations
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity, 
    // Sum of (price * quantity) for every item
    0
  );
  
  

  const shipping = state.items.length > 0 ? 20 : 0; 
  // Shipping cost (20) if cart isn't empty

  const total = subtotal + shipping; 
  // Final total cost

  // Dispatch functions to trigger cart actions
  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const increaseQty = (id) =>
    dispatch({ type: "INCREASE_QTY", payload: id });

  const decreaseQty = (id) =>
    dispatch({ type: "DECREASE_QTY", payload: id });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartQuantity = state.items.reduce(
    (acc, item) => acc + item.quantity, 
    // Count total number of items (sum of quantities)
    0
  );

  // Helper function to get cart quantity for a specific product
  const getCartQuantity = (productId) => {
    const item = state.items.find((item) => {
      const itemId = item._id || item.id;
      return itemId === productId;
    });
    return item ? item.quantity : 0;
  };

  // Provide all cart data + functions to children components
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        subtotal,
        cartQuantity,
        shipping,
        total,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use cart anywhere
export const useCart = () => useContext(CartContext); 
// Allows easy access to cart context data & functions
