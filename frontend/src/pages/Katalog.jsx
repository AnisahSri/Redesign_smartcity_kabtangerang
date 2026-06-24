import React, { useState, useEffect } from "react";
import "../styles/pages/katalog_page.css";


import smartImg from "../assets/images/bukutamu.svg";
import logoImg from "../assets/images/kabtang.png";
import petaImg from "../assets/images/peta.png";
import digiImg from "../assets/images/digi.png";
import mataImg from "../assets/images/dishub.png";
import websiteImg from "../assets/images/website.svg";

export default function KatalogSection() {

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const katalogData = [
    {
      title: "Sistem Kunjungan Tamu",
      desc: "Pendataan dan Monitoring Tamu Instansi",
      img: smartImg,
      link: "https://e-tamu.tangerangkab.my.id/"
    },
    {
      title: "Tangerang Gemilang",
      desc: "Layanan Cerdas untuk Masyarakat",
      img: logoImg,
      link: "https://gemilang.tangerangkab.go.id/"
    },
    {
      title: "Mata Hub",
      desc: "Smart Monitoring untuk Kabupaten Tangerang",
      img: mataImg,
      link: "https://cctv-dishub.tangerangkab.go.id/cctv"
    },
    {
      title: "D'Naker Digi",
      desc: "Digitalisasi Layanan Ketenagakerjaan",
      img: digiImg,
      link: "https://siapkerja.tangerangkab.go.id/home"
    },
    {
      title: "Geo Maps Kabupaten Tangerang",
      desc: "Peta Geografis Kabupaten Tangerang",
      img: petaImg,
      link: "https://geomaps.tangerangkab.go.id/catalogue/#/map/89",
      big: true
    }
  ];

  const filteredData = katalogData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const scrollToItem = (itemTitle) => {
    const index = katalogData.findIndex(i => i.title === itemTitle);
    if (index !== -1) {
      const element = document.getElementById(`katalog-item-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setShowDropdown(false);
      }
    }
  };
  
  const handleSearchSubmit = () => {
    if (filteredData.length > 0 && searchQuery) {
      scrollToItem(filteredData[0].title);
    }
  };
  return (
    <section className="section-katalog">

      {/* HERO */}
      <div className="katalog-hero-section">
        {/* Background Elements */}
        <div className="hero-bg-grid"></div>
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
        <div className="hero-shape shape-circle"></div>

        <div className="katalog-hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            PORTAL RESMI PEMERINTAH DAERAH
          </div>
          
          <h1 className="hero-title">
            Katalog Sistem<br/>Pemerintahan Daerah
          </h1>
          
          <p className="hero-subtitle">
            Akses terpadu seluruh aplikasi dan layanan digital pemerintahan dalam satu<br/>
            pintu cepat, aman, dan transparan.
          </p>
          
          <div className="hero-search-bar-container" style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
            <div className="hero-search-bar" style={{ maxWidth: 'none' }}>
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Cari aplikasi, layanan, atau OPD..." 
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => { if(searchQuery) setShowDropdown(true); }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleSearchSubmit(); }}
              />
              <button className="btn-cari" onClick={handleSearchSubmit}>Cari</button>
            </div>

            {/* Dropdown Suggestions */}
            {showDropdown && (
              <div className="search-dropdown" style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                left: 0,
                width: '100%',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                zIndex: 10,
                textAlign: 'left'
              }}>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => scrollToItem(item.title)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 20px',
                        cursor: 'pointer',
                        color: '#333',
                        borderBottom: idx !== filteredData.length - 1 ? '1px solid #f0f0f0' : 'none',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img src={item.img} alt={item.title} style={{ width: '30px', height: '30px', marginRight: '15px', objectFit: 'contain' }} />
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '15px' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '15px 20px', color: '#888', textAlign: 'center' }}>
                    Layanan tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="katalog-list">
        {katalogData.map((item, index) => (

          item.big ? (

            /* CARD KHUSUS GEOMAPS */
            <div className="katalog-item geomaps-item" key={index} id={`katalog-item-${index}`}>

              <div className="item-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="item-image">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <img src={item.img} alt={item.title} />
                </a>
              </div>

            </div>

          ) : (

            /* CARD NORMAL */
            <div className="katalog-item" key={index} id={`katalog-item-${index}`}>

              <div className="item-image">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="item-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="item-button">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Lihat Selengkapnya →
                </a>
              </div>

            </div>

          )

        ))}
      </div>

      {/* Tombol Back to Top */}
      {showScrollTop && (
        <button 
          className="btn-scroll-top" 
          onClick={scrollToTop}
          title="Kembali ke atas"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </button>
      )}

    </section>
  );
}

