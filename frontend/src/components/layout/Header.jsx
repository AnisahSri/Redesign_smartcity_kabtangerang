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
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [language, setLanguage] = useState("ID");

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

  const toggleDropdown = (menu) => {
  setOpenDropdown(openDropdown === menu ? null : menu);
};

  const toggleLanguage = (lang) => {
  setLanguage(lang);
};

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">

          {/* LOGO */}
          <div className="logo">
            <Link to="/" onClick={handleNavClick}>
             <img
             src="/gambar/smartcity.svg"
             alt="Smart City Logo"
             className="logo-img"
             />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <ul>
              {/* Tentang */}
              <li className="dropdown">
                <span>
                  Tentang <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                  <Link to="/profile">Profil</Link>
                  <Link to="/sejarah">Sejarah</Link>
                </div>
              </li>

              <li>
                <Link to="/dimensi">Dimensi</Link>
              </li>

              <li>
                <Link to="/event">Agenda</Link>
              </li>

              <li>
                <Link to="/katalog">Katalog</Link>
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
                  <Link to="/">WiFi Publik</Link>
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

              {/* SEARCH */}
                <div
                  className={`search-container ${(isSearchExpanded || isSearchHovered) ? 'expanded' : ''}`}
                  onMouseEnter={() => setIsSearchHovered(true)}
                  onMouseLeave={() => setIsSearchHovered(false)}
                >
                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-input"
                  placeholder={language === "ID" ? "Cari..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
                <button
                  type="button"
                  className="search-icon"
                  onClick={toggleSearch}
                >
                  <Search size={20} />
                </button>
              </div>

              {/* LANGUAGE SWITCH */}
              <div className="lang-switch">
                <button
                  className={language === "ID" ? "active" : ""}
                  onClick={() => toggleLanguage("ID")}
                >
                  ID
                </button>
                <button
                  className={language === "EN" ? "active" : ""}
                  onClick={() => toggleLanguage("EN")}
                >
                  EN
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

    {/* Tentang */}
    <li className={`mobile-dropdown ${openDropdown === 'tentang' ? 'active' : ''}`}>
      <div 
        className="mobile-dropdown-title"
        onClick={() => toggleDropdown('tentang')}
      >
        Tentang <span>▾</span>
      </div>

      <ul className="mobile-submenu">
        <li><Link to="/profile" onClick={handleNavClick}>Profil</Link></li>
        <li><Link to="/about" onClick={handleNavClick}>Sejarah</Link></li>
      </ul>
    </li>

    {/* Dimensi */}
    <li>
      <Link to="/dimensi" onClick={handleNavClick}>Dimensi</Link>
    </li>

    {/* Agenda */}
    <li>
      <Link to="/event" onClick={handleNavClick}>Agenda</Link>
    </li>

    {/* Katalog */}
    <li>
      <Link to="/katalog" onClick={handleNavClick}>Katalog</Link>
    </li>

    {/* Fasilitas Publik */}
    <li className={`mobile-dropdown ${openDropdown === 'fasilitas' ? 'active' : ''}`}>
      <div 
        className="mobile-dropdown-title"
        onClick={() => toggleDropdown('fasilitas')}
      >
        Fasilitas Publik <span>▾</span>
      </div>

      <ul className="mobile-submenu">
        <li><Link to="/">Sekolah</Link></li>
        <li><Link to="/">Perpustakaan</Link></li>
        <li><Link to="/">Beasiswa</Link></li>
        <li><Link to="/">WiFi Publik</Link></li>
        <li><Link to="/">Fasilitas Kesehatan</Link></li>
      </ul>
    </li>

    {/* Publikasi */}
    <li>
      <Link to="/publication" onClick={handleNavClick}>Publikasi</Link>
    </li>

  </ul>
</nav>

        {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Header;