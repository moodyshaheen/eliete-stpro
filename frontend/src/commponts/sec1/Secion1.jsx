import { useEffect, useState } from "react";
import "./secion1.css";

// === IMPORT REACT ICONS ===
import { FaTags, FaTruckMoving, FaSyncAlt, FaFire } from "react-icons/fa";

function Secion1() {
  const targetDate = new Date("2025-11-22T23:59:59").getTime();//use your target date here because the current year is ending
  //getTime() method returns the number of milliseconds since January 1, 1970 but we need to convert it to a timestamp.
  //new Date() creates a date object with a specified date and time.
  // new Date("2025-12-31T23:59:59") creates a date object for December 31, 2025, at 11:59:59 PM.
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });//initial state for the countdown timer because at the beginning we don't have any time left yet.
  
 // setInterval(() => {
    
 // }, interval);// The setInterval function is used to execute a function repeatedly at specified time intervals. In this case, it will be used to update the countdown timer every second.
 
 //clearInterval()// This line is used to stop the interval timer when the component is unmounted or when the countdown ends.
 //floor()// The Math.floor() function is used to round down the calculated time values to the nearest whole number.
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;// because we don't want to update the state anymore.
      }// If the difference is less than or equal to zero, it means the countdown has ended, so we clear the interval to stop the timer.

      setTimeLeft({             //ms   //min  //hr   //day
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),// Calculate days left by dividing the difference by the number of milliseconds in a day.
        //months: Math.floor((diff / (1000 * 60 * 60 * 24 * 30)) % 12),//
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),// Calculate hours left by dividing the difference by the number of milliseconds in an hour and taking modulo 24 to get remaining hours after days are accounted for.
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);// Update every second because we want the countdown to be accurate to the second.

    return () => clearInterval(timer);
  }, []);// Empty dependency array means this effect runs once when the component mounts because we want to start the countdown timer as soon as the component is rendered.

  return (
    <div className="Secion1">

      <div className="overlay"></div>

      <div className="content">

        <button className="limited-btn"> <FaFire/> LIMITED TIME OFFER</button>

        <h1 className="title">Mega Sale Event</h1>
        <h2 className="subtitle">Up to <span>70% Off</span></h2>

        <p className="desc">
          Don't miss out on our biggest sale of the year! Premium products at unbeatable prices.
        </p>

        {/* COUNTDOWN */}
        <div className="countdown">
          <div className="box">
            <h3>{timeLeft.days}</h3>
            <span>Days</span>
          </div>
          <div className="box">
            <h3>{timeLeft.hours}</h3>
            <span>Hours</span>
          </div>
          <div className="box">
            <h3>{timeLeft.minutes}</h3>
            <span>Minutes</span>
          </div>
          <div className="box">
            <h3>{timeLeft.seconds}</h3>
            <span>Seconds</span>
          </div>
        </div>

        {/* FEATURES */}
        <div className="features">

          <div className="card">
            <div className="icon12"><FaTags /></div>
            <h4>Best Prices</h4>
            <p>Guaranteed lowest prices on all sale items</p>
          </div>

          <div className="card">
            <div className="icon12"><FaTruckMoving /></div>
            <h4>Free Shipping</h4>
            <p>No minimum order required during sale</p>
          </div>

          <div className="card">
            <div className="icon12"><FaSyncAlt /></div>
            <h4>Easy Returns</h4>
            <p>30-day hassle-free return policy</p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="buttons">
          <button className="shopBtn">Shop Sale Now</button>
          <button className="viewBtn">View All Products</button>
        </div>

      </div>
    </div>
  );
}

export default Secion1;
