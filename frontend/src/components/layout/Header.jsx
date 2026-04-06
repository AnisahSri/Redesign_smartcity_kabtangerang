import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/header.css';

import logoImg from "../../assets/images/smartcity.svg";
import { useLanguage } from '../../utils/LanguageContext';
import { useDynamicMenu } from "../../hooks/useDynamicMenu";
import { STATIC_MENU_FALLBACK } from '../../data/staticMenuFallback.js';

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

  const { menuItems, loading } = useDynamicMenu();

  // Gunakan fallback jika loading/error
  const finalMenuItems = loading || !menuItems.length ? STATIC_MENU_FALLBACK : menuItems;

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

          {/* DESKTOP NAV - DYNAMIC */}
          <nav className="desktop-nav">
            <ul>
              {finalMenuItems.map((item, index) => (
                item.children && item.children.length ? (
                  <li key={index} className="dropdown">
                    <span onClick={() => toggleDropdown(`desktop-${index}`)}>
                      {language === "ID" ? item.titleID : item.titleEN} <ChevronDown size={16} />
                    </span>
                    <div className="dropdown-content">
                      {item.children.map((child, cIndex) => (
                        <Link 
                          key={cIndex} 
                          to={child.path}
                          onClick={handleNavClick}
                        >
                          {language === "ID" ? child.titleID : child.titleEN}
                        </Link>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={index}>
                    <Link to={item.path} onClick={handleNavClick}>
                      {language === "ID" ? item.titleID : item.titleEN}
                    </Link>
                  </li>
                )
              ))}
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

      {/* MOBILE NAV - DYNAMIC */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {finalMenuItems.map((item, index) => (
            item.children && item.children.length ? (
              <li key={`mobile-${index}`} className={`mobile-dropdown ${openDropdown === `mobile-${index}` ? 'active' : ''}`}>
                <div
                  className="mobile-dropdown-title"
                  onClick={() => toggleDropdown(`mobile-${index}`)}
                >
                  {language === "ID" ? item.titleID : item.titleEN} <span>▾</span>
                </div>
                <ul className="mobile-submenu">
                  {item.children.map((child, cIndex) => (
                    <li key={cIndex}>
                      <Link to={child.path} onClick={handleNavClick}>
                        {language === "ID" ? child.titleID : child.titleEN}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={`mobile-${index}`}>
                <Link to={item.path} onClick={handleNavClick}>
                  {language === "ID" ? item.titleID : item.titleEN}
                </Link>
              </li>
            )
          ))}
        </ul>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </>
  );
};

export default Header;