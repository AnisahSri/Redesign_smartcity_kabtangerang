import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/header.css';

import logoImg from "../../assets/images/smartcity.svg";
import { useLanguage } from '../../utils/LanguageContext';

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { language, toggleLanguage } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

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

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">

          {/* LOGO */}
          <div className="logo">
            <Link to="/" onClick={handleNavClick}>
              <img
                src={logoImg}
                alt="Smart City Logo"
                className="logo-img"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav">
            <ul>

              <li className="dropdown">
                <span>
                  {language === "ID" ? "Tentang" : "About"} <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                  <Link to="/profile">
                    {language === "ID" ? "Profil" : "Profile"}
                  </Link>
                  <Link to="/sejarah">
                    {language === "ID" ? "Sejarah" : "History"}
                  </Link>
                </div>
              </li>

              <li>
                <Link to="/dimensi">
                  {language === "ID" ? "Dimensi" : "Dimensions"}
                </Link>
              </li>

              <li>
                <Link to="/event">
                  {language === "ID" ? "Agenda" : "Events"}
                </Link>
              </li>

              <li>
                <Link to="/katalog">
                  {language === "ID" ? "Katalog" : "Catalog"}
                </Link>
              </li>

              <li className="dropdown">
                <span>
                  {language === "ID" ? "Fasilitas Publik" : "Public Facilities"} <ChevronDown size={16} />
                </span>
                <div className="dropdown-content">
                    <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                      {language === "ID" ? "Sekolah" : "Schools"}
                    </a>

                    <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                      {language === "ID" ? "Perpustakaan" : "Libraries"}
                    </a>

                    <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                      {language === "ID" ? "Beasiswa" : "Scholarships"}
                    </a>

                    <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                      {language === "ID" ? "WiFi Publik" : "Public WiFi"}
                    </a>

                    <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                      {language === "ID" ? "Fasilitas Kesehatan" : "Health Facilities"}
                    </a>

                  </div>
              </li>

              <li>
                <Link to="/publication">
                  {language === "ID" ? "Publikasi" : "Publications"}
                </Link>
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

          <li className={`mobile-dropdown ${openDropdown === 'tentang' ? 'active' : ''}`}>
            <div
              className="mobile-dropdown-title"
              onClick={() => toggleDropdown('tentang')}
            >
              {language === "ID" ? "Tentang" : "About"} <span>▾</span>
            </div>

            <ul className="mobile-submenu">
              <li>
                <Link to="/profile" onClick={handleNavClick}>
                  {language === "ID" ? "Profil" : "Profile"}
                </Link>
              </li>
              <li>
                <Link to="/sejarah" onClick={handleNavClick}>
                  {language === "ID" ? "Sejarah" : "History"}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/dimensi" onClick={handleNavClick}>
              {language === "ID" ? "Dimensi" : "Dimensions"}
            </Link>
          </li>

          <li>
            <Link to="/event" onClick={handleNavClick}>
              {language === "ID" ? "Agenda" : "Events"}
            </Link>
          </li>

          <li>
            <Link to="/katalog" onClick={handleNavClick}>
              {language === "ID" ? "Katalog" : "Catalog"}
            </Link>
          </li>

          <li className={`mobile-dropdown ${openDropdown === 'fasilitas' ? 'active' : ''}`}>
            <div
              className="mobile-dropdown-title"
              onClick={() => toggleDropdown('fasilitas')}
            >
              {language === "ID" ? "Fasilitas Publik" : "Public Facilities"} <span>▾</span>
            </div>

            <ul className="mobile-submenu">

              <li>
                <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "Sekolah" : "Schools"}
                </a>
              </li>

              <li>
                <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "Perpustakaan" : "Libraries"}
                </a>
              </li>

              <li>
                <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "Beasiswa" : "Scholarships"}
                </a>
              </li>

              <li>
                <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "WiFi Publik" : "Public WiFi"}
                </a>
              </li>

              <li>
                <a href="https://geomaps.tangerangkab.go.id/#/" target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "Fasilitas Kesehatan" : "Health Facilities"}
                </a>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/publication" onClick={handleNavClick}>
              {language === "ID" ? "Publikasi" : "Publications"}
            </Link>
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