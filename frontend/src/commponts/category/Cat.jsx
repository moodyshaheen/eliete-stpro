import { useState, useEffect } from "react";
import "./cat.css";
import { assets } from "../../assets/assets";
import { FaHeart, FaSyncAlt, FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../../context/Cartcontext";
import { useFavorites } from "../../context/FavoritesContext";
import { productAPI, categoryAPI } from "../../utils/api";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Cat() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, getCartQuantity } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const [loadingId, setLoadingId] = useState(null); // لتحديد سبينر المنتج فقط

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProducts({ status: 'active' });
      setProducts(data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await categoryAPI.getCategories();
      const cats = data.categories || [];
      // Create category list with "all" option
      const categoryList = [
        { key: "all", label: "All", _id: "all" },
        ...cats.map(cat => ({
          key: cat.slug || cat.name.toLowerCase(),
          label: cat.name,
          _id: cat._id
        }))
      ];
      setCategories(categoryList);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Fallback to default categories
      setCategories(assets.customCategories.map(cat => ({ ...cat, _id: cat.key })));
    }
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => {
          const productCategory = product.category?.slug || 
                               product.category?.name?.toLowerCase() || 
                               product.category?.toLowerCase() || '';
          return productCategory === activeCategory.toLowerCase();
        });

  const categoryCounts = categories.map((cat) => ({
    ...cat,
    count:
      cat.key === "all"
        ? products.length
        : products.filter((p) => {
            const pCat = p.category?.slug || 
                        p.category?.name?.toLowerCase() || 
                        p.category?.toLowerCase() || '';
            return pCat === cat.key.toLowerCase();
          }).length,
  }));

  const handleAdd = async (product) => {
    const productId = product._id || product.id;
    const stock = product.stock || 0;
    const cartQuantity = getCartQuantity(productId);
    
    // التحقق من الـ stock المتاح
    if (cartQuantity >= stock) {
      toast.error(`Cannot add more. Only ${stock} items available in stock.`);
      return;
    }

    setLoadingId(productId);

    // Convert backend product format to cart format
    const cartProduct = {
      id: productId,
      _id: product._id,
      title: product.title,
      price: product.finalPrice || product.price,
      oldPrice: product.price,
      image: (() => {
        const img = product.images?.[0] || product.image || '';
        return img.startsWith('http') 
          ? img 
          : img.startsWith('/upload') 
            ? `http://localhost:4000${img}`
            : img ? `http://localhost:4000/upload/${img}` : '';
      })(),
      quantity: 1,
      stock: stock // حفظ الـ stock الأصلي
    };

    setTimeout(() => {
      addToCart(cartProduct);
      toast.success(`${product.title} added to cart!`);
      setLoadingId(null);
    }, 800);
  };

  const handleFavorite = (product) => {
    const productId = product._id || product.id;
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
      toast.success(`${product.title} removed from favorites!`);
    } else {
      // معالجة مسار الصورة قبل الإضافة
      const productImage = product.images?.[0] || product.image || '';
      const imageUrl = productImage.startsWith('http') 
        ? productImage 
        : productImage.startsWith('/upload') 
          ? `http://localhost:4000${productImage}`
          : productImage ? `http://localhost:4000/upload/${productImage}` : '';
      
      const favoriteProduct = {
        ...product,
        id: productId,
        image: imageUrl
      };
      
      const added = addToFavorites(favoriteProduct);
      if (added) {
        toast.success(`${product.title} added to favorites!`);
      }
    }
  };

  return (
    <div className="cat-container">
      <h2 className="cat-title">Featured Products</h2>
      <p className="cat-subtitle">Handpicked selections from our premium collection</p>

      <div className="category-buttons">
        {categoryCounts.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`category-btn ${activeCategory === cat.key ? "active" : ""}`}
          >
            {cat.label} <span>{cat.count}</span>
          </button>
        ))}
      </div>

      <div className="product-grid">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <ClipLoader size={40} />
            <p style={{ marginTop: '20px' }}>Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
            <p>No products found</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const productId = product._id || product.id;
            const productImage = product.images?.[0] || product.image || '';
            // Fix: Handle image URL properly
            const imageUrl = productImage.startsWith('http') 
              ? productImage 
              : productImage.startsWith('/upload') 
                ? `http://localhost:4000${productImage}`
                : productImage ? `http://localhost:4000/upload/${productImage}` : '';
            const finalPrice = product.finalPrice || product.price;
            const discount = product.discount || 0;
            const originalPrice = discount > 0 ? product.price : null;
            const stock = product.stock || 0;
            const cartQuantity = getCartQuantity(productId);
            const availableStock = stock - cartQuantity; // الـ stock المتاح بعد طرح الكمية في السلة

            return (
              <div className="product-card" key={productId}>
                <div className="product-img-container">
                  <img src={imageUrl} alt={product.title} className="product-img" />

                  <div className="product-icons">
                    <button 
                      className={`icon-btn ${isFavorite(productId) ? 'favorited' : ''}`}
                      onClick={() => handleFavorite(product)}
                    >
                      <FaHeart />
                    </button>
                    <button className="icon-btn"><FaSyncAlt /></button>
                  </div>

                  {discount > 10 && <span className="badge sale">Sale</span>}
                  {discount <= 10 && discount > 5 && <span className="badge new">New</span>}
                  {discount <= 5 && discount > 0 && <span className="badge popular">Popular</span>}
                </div>

                <div className="product-info">
                  <h3>{product.title}</h3>

                  <div className="product-rating">
                    {[...Array(Math.min(5, Math.floor(product.rating?.average || 4)))].map((_, i) => (
                      <FaStar key={i} color="#f59e0b" />
                    ))}
                    <span className="rating-count">({product.rating?.count || 0})</span>
                  </div>

                  <div className="product-stock-info">
                    <span className="stock-label">Stock: <strong>{availableStock}</strong></span>
                    {cartQuantity > 0 && (
                      <span className="cart-quantity-badge">In Cart: {cartQuantity}</span>
                    )}
                  </div>

                  <p className="product-price">
                    ${finalPrice.toFixed(2)}
                    {originalPrice && (
                      <span className="old-price">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </p>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAdd(product)}
                    disabled={loadingId === productId || availableStock <= 0}
                  >
                    {loadingId === productId ? (
                      <ClipLoader size={18} />
                    ) : availableStock <= 0 ? (
                      'Out of Stock'
                    ) : (
                      <>
                        <FaShoppingCart /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="load-more">
        <button>Load More Products ⬇</button>
      </div>
    </div>
  );
}

export default Cat;
