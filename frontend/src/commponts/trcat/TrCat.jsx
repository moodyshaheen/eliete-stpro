import React from 'react'
import './trcat.css'
import img1 from '../../assets/imges23/search-image25.jpg'
import img2 from '../../assets/imges23/search-image17.jpg'
import img3 from '../../assets/imges23/search-image16.jpg'
import img4 from '../../assets/imges23/search-image15.jpg'
import img5 from '../../assets/imges23/search-image10.jpg'
import img6 from '../../assets/imges23/search-image8.jpg'
import { FaArrowRight } from "react-icons/fa6";

function TrCat() {
  const categoris = [
    {
      name: "Fashion & Apparel",
      img: img1,
      det: "Latest trends in clothing and accessories",
      num: "2,500+ items",
      color: "linear-gradient(180deg, rgba(233,30,99,0.6), rgba(233,30,99,0.85))"
    },
    {
      name: "Electronics & Tech",
      img: img2,
      det: "Cutting-edge gadgets and devices",
      num: "1,800+ items",
      color: "linear-gradient(180deg, rgba(3,169,244,0.6), rgba(3,169,244,0.85))"
    },
    {
      name: "Home & Living",
      img: img3,
      det: "Beautiful decor and furniture",
      num: "3,200+ items",
      color: "linear-gradient(180deg, rgba(0,200,83,0.6), rgba(0,200,83,0.85))"
    },
    {
      name: "Beauty & Care",
      img: img4,
      det: "Premium skincare and cosmetics",
      num: "950+ items",
      color: "linear-gradient(180deg, rgba(156,39,176,0.6), rgba(156,39,176,0.85))"
    },
    {
      name: "Sports & Fitness",
      img: img5,
      det: "Gear for active lifestyle",
      num: "1,400+ items",
      color: "linear-gradient(180deg, rgba(244,67,54,0.6), rgba(244,67,54,0.85))"
    },
    {
      name: "Books & Media",
      img: img6,
      det: "Knowledge and entertainment",
      num: "2,100+ items",
      color: "linear-gradient(180deg, rgba(63,81,181,0.6), rgba(63,81,181,0.85))"
    }
  ];

  return (
    <div className='TrCat'>
      <div className="h2p">
        <h2>Trending Categories</h2>
        <p>Explore our most popular product categories and discover amazing deals</p>
      </div>

      <div className="graidcolm">
        {categoris.map((cat, index) => (
          <div className="cardr" key={index}>
            <img src={cat.img} alt={cat.name} className="imghj" />
            <div className="overlay" style={{ background: cat.color }}></div>
            <div className="deile">
              <span className='spanto'>{cat.name}</span>
              <p className='pspanto'>{cat.det}</p>
              <div className="iconef">
                <p className='picon'>{cat.num}</p>
                <FaArrowRight className='iconarrow' />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className='fwfolbtn'>
        View All Categories <FaArrowRight className='iconarrow' />
      </button>
    </div>
  )
}

export default TrCat
