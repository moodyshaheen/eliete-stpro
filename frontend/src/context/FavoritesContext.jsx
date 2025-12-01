import { createContext, useContext, useReducer, useEffect } from "react";

// Create Context
const FavoritesContext = createContext();

// Reducer Logic
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      // Check if product already exists
      const exists = state.items.find((item) => item.id === action.payload.id);
      
      if (exists) {
        // If exists, don't add again (prevent duplicates)
        return state;
      }

      // Add product to favorites
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_FROM_FAVORITES":
      // Remove item by its ID
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_FAVORITES":
      // Empty favorites completely
      return { ...state, items: [] };

    default:
      return state;
  }
};

// Provider Component
export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage OR empty array
  const savedFavorites = localStorage.getItem("favoriteItems");
  
  const initialState = {
    items: savedFavorites ? JSON.parse(savedFavorites) : [],
  };

  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Save favorites to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(state.items));
  }, [state.items]);

  // Dispatch functions to trigger favorites actions
  const addToFavorites = (product) => {
    const exists = state.items.find((item) => item.id === product.id);
    if (!exists) {
      dispatch({ type: "ADD_TO_FAVORITES", payload: product });
      return true; // Successfully added
    }
    return false; // Already exists
  };

  const removeFromFavorites = (id) =>
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: id });

  const clearFavorites = () => dispatch({ type: "CLEAR_FAVORITES" });

  const isFavorite = (id) => {
    return state.items.some((item) => item.id === id);
  };

  const favoritesCount = state.items.length;

  // Provide all favorites data + functions to children components
  return (
    <FavoritesContext.Provider
      value={{
        items: state.items,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom Hook to use favorites anywhere
export const useFavorites = () => useContext(FavoritesContext);

