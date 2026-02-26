import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/header.css';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log('Searching:', searchQuery);
        setSearchQuery('');
        setIsSearchExpanded(false);
      }
    }
  };

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">

          {/* LOGO */}
          <div className="logo">
            <Link to="/" className="logo-text" onClick={handleNavClick}>
              SmartCity
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <ul>

              <li>
                <Link to="/" className={pathname === '/' ? 'active-nav-link' : ''}>
                  Beranda
                </Link>
              </li>

              {/* Tentang */}
              <li className="dropdown">
                <span>
                  Tentang <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                  <Link to="/profile">Profil</Link>
                  <Link to="/persona">Persona</Link>
                  <Link to="/about">Sejarah</Link>
                </div>
              </li>

              <li>
                <Link to="/dimensi">Dimensi</Link>
              </li>

              <li>
                <Link to="/event">Agenda</Link>
              </li>

              {/* Katalog */}
              <li className="dropdown">
                <span>
                  Katalog <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                  <Link to="/">Sistem Kunjungan Halaman</Link>
                  <Link to="/">Tangerang Gemilang</Link>
                  <Link to="/">Mata Hub</Link>
                  <Link to="/">D'naker Digi</Link>
                </div>
              </li>

              {/* Fasilitas Publik */}
              <li className="dropdown">
                <span>
                  Fasilitas Publik <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                  <Link to="/">Sekolah</Link>
                  <Link to="/">Perpustakaan</Link>
                  <Link to="/">Beasiswa</Link>
                  <Link to="/">Wifi Publik</Link>
                  <Link to="/">Fasilitas Kesehatan</Link>
                </div>
              </li>

              <li>
                <Link to="/publication">Publikasi</Link>
              </li>

            </ul>
          </nav>

          {/* RIGHT CONTROLS */}
          <div className="header-controls">

            <div className={`search-container ${isSearchExpanded ? 'expanded' : ''}`}>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Cari..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
              <button
                type="button"
                className="search-icon"
                onClick={isSearchExpanded ? handleSearch : toggleSearch}
              >
                <Search size={20} />
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>

          <li><Link to="/" onClick={handleNavClick}>Beranda</Link></li>

          <li>
            <span className="mobile-section-title">Tentang</span>
            <Link to="/profile" onClick={handleNavClick}>Profil</Link>
            <Link to="/persona" onClick={handleNavClick}>Persona</Link>
            <Link to="/about" onClick={handleNavClick}>Sejarah</Link>
          </li>

          <li><Link to="/dimensi" onClick={handleNavClick}>Dimensi</Link></li>
          <li><Link to="/event" onClick={handleNavClick}>Agenda</Link></li>

          <li>
            <span className="mobile-section-title">Katalog</span>
            <Link to="/">Sistem Kunjungan Halaman</Link>
            <Link to="/">Tangerang Gemilang</Link>
            <Link to="/">Mata Hub</Link>
            <Link to="/">D'naker Digi</Link>
          </li>

          <li>
            <span className="mobile-section-title">Fasilitas Publik</span>
            <Link to="/">Sekolah</Link>
            <Link to="/">Perpustakaan</Link>
            <Link to="/">Beasiswa</Link>
            <Link to="/">Wifi Publik</Link>
            <Link to="/">Fasilitas Kesehatan</Link>
          </li>

          <li><Link to="/publication" onClick={handleNavClick}>Publikasi</Link></li>

        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Header;