import React from "react";
import './Header.css'

const Header = () => {
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <img
          src="src/assets/png/logo-no-background.png"
          alt="logo"
          width={150}
        />

        <div className="flexCenter h-menu">
          <a href="/">Home</a>
          <a href="#companies">Companies</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <a href="">Sign in</a>
          
          <button className="button">
            <a href="">Sign Up</a>
          </button>
          <button className="button">
            <a href="">Dashboard</a>
          </button>
        </div>
        
      </div>
    </section>
  );
};

export default Header;

