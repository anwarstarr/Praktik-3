import React from 'react';
import './Header.css';

const Header = ({ title, subtitle, user }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-text">
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>

        {user && (
          <div className="user-info">
            <span>Halo, {user.name}</span>
            <img
              src={user.avatar}
              alt={user.name}
              className="user-avatar"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;