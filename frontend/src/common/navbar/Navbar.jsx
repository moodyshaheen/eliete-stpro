import React, { useState } from 'react'
import './navbar.css'
import {
  FaPhone, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare,
  FaHeart, FaUser, FaShoppingCart, FaSearch, FaHome, FaAddressBook
} from 'react-icons/fa'
import { MdEmail, MdOutlineShoppingBag, MdOutlineLocalFireDepartment } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/Cartcontext';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

function Navbar() {

  const { cartQuantity } = useCart();
  const { favoritesCount } = useFavorites();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const handleLogout = () => {
    logout();
    setOpenUser(false);
    navigate('/');
  };

  return (
    <div className='navbar'>

      {/* -------- TOP BAR -------- */}
      <div className="n-top">
        <div className="nt-left">
          <span className="phone"> <FaPhone /> +123 456 7890 </span>
          <span className="email"> <MdEmail /> hello@elitestore.com </span>
        </div>

        <div className="nt-right">
          <span>Free shipping on orders over $99!</span>
          <div className="social-fje">
            <FaFacebookSquare className='social-icon' />
            <FaTwitterSquare className='social-icon' />
            <FaInstagramSquare className='social-icon' />
          </div>
        </div>
      </div>

      {/* -------- BOTTOM NAV -------- */}
      <div className="n-bottom">

        {/* LOGO */}
        <div className="logo">
          <Link to={'/'} className="logorif">
            <FaHome className='iconlogo' />
            <span>EliteStore</span>
          </Link>
        </div>

        {/* MENU ICON MOBILE */}
        <div className="hamburger" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <IoMdClose /> : <GiHamburgerMenu />}
        </div>

        {/* MENU LIST */}
        <ul className={`listst ${openMenu ? "open" : ""}`}>
          <li><Link to={'/'} className="home"> <FaHome /> Home</Link></li>
          <li><Link to={'/products'}> <MdOutlineShoppingBag /> Products</Link></li>
          <li><Link to={'/deals'}> <MdOutlineLocalFireDepartment /> Deals</Link></li>
          <li><Link to={'/about'}> <IoIosInformationCircleOutline /> About</Link></li>
          <li><Link to={'/contact'}> <MdEmail /> Contact</Link></li>
        </ul>

        {/* SEARCH + ICONS */}
        <div className="sercarus">

          <div className="serche">
            <input type="text" placeholder='Search...' className="inptser" />
            <FaSearch className='searchicon' />
          </div>

          <div className="iconimpo">
            <Link to={'/cart'} className="icon-badge">
              <FaShoppingCart className='icn' />
              {cartQuantity > 0 && <span className='badge green'>{cartQuantity}</span>}
            </Link>

            <Link to={'/favorites'} className="icon-badge">
              <FaHeart className='icn' />
              {favoritesCount > 0 && <span className='badge red'>{favoritesCount}</span>}
            </Link>

            {!isAuthenticated ? (
              <>
                <button className='usericon56' onClick={() => setOpenUser(!openUser)}>
                  <FaUser />
                </button>
                {/* USER MENU */}
                <div className={`fauserlor ${openUser ? "show" : ""}`}>
                  <Link to={'/profile'} onClick={() => setOpenUser(false)}> <FaUser /> Login </Link>
                  <Link to={'/profile'} onClick={() => setOpenUser(false)}> <FaAddressBook /> Register </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={'/profile'} className="icon-badge">
                  <FaUser className='icn' />
                </Link>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default Navbar
