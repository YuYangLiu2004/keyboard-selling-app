import React from 'react';

function Header({ cartCount, onNavigate }) {
  const cartButtonClass = `btn btn-outline-dark ${cartCount > 0 ? 'cart-button-glow' : ''}`;

  return (
    <header className="bg-white shadow-sm sticky-top">
      <nav className="navbar navbar-expand-lg">

        <div className="container d-flex justify-content-between align-items-center">


          <span className="navbar-brand mb-0 h1 fs-4" style={{cursor: 'pointer'}} onClick={() => onNavigate('list')}>
            <i className="bi bi-keyboard-fill me-2"></i>Key Lair
          </span>

          {/* Right Side: Group for the buttons */}
          <div className="d-flex align-items-center">

            {/* NEW: Portfolio Button */}
            <a 
              href="" 
              className="btn btn-outline-secondary me-3"
              target="_blank" 
              rel="noopener noreferrer"
            >
              My Portfolio
            </a>


            <button className={cartButtonClass} onClick={() => onNavigate('cart')}>
              <i className="bi bi-cart-fill me-1"></i>
              Cart <span className="badge bg-dark text-white ms-1 rounded-pill">{cartCount}</span>
            </button>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;