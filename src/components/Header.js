import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <h1>자유 게시판</h1>
          <span className="header__subtitle">Free Board</span>
        </Link>
        
        <nav className="header__nav">
          <Link to="/" className="header__navItem">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>홈</span>
          </Link>
          
          <Link to="/write" className="header__navItem header__navItem--primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
            <span>글쓰기</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
