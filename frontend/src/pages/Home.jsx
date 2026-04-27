import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

import { apiEndpoints } from "../utils/helpers.js";
import "../styles/pages/home_page.css"; 

import heroImage from "../assets/images/background_meeting.jpeg";

/* ====== ICON FITUR UNGGULAN ====== */
import smartGovernance from "../assets/icons/smartgovernance.svg";
import smartLiving from "../assets/icons/smartliving.svg";
import smartSociety from "../assets/icons/smartsociety.svg";
import smartEconomy from "../assets/icons/smarteconomy.svg";
import smartEnvironment from "../assets/icons/smartenvironment.svg";
import smartBranding from "../assets/icons/smartbranding.svg";

/* ====== ICON GEMILANG ====== */
import hpIcon from "../assets/icons/hp.svg";
import lampuBiru from "../assets/icons/lampubiru.svg";
import lampuKuning from "../assets/icons/lampukuning.svg";
import lampuUngu from "../assets/icons/lampuungu.svg";

/* ====== VIDEO VIRTUAL TOUR ====== */
import virtualTourVideo from "../assets/video/virtualtour.mp4";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const [active, setActive] = useState(null);
  const [fiturDetail, setFiturDetail] = useState([]);
  const [loadingFitur, setLoadingFitur] = useState(true);
  const detailRef = useRef(null);

  useEffect(() => {
    const fetchFiturUnggulan = async () => {
      try {
        const response = await apiEndpoints.dimensi.getAll();
        const jsonData = response.data;
        const dimensiList = jsonData.data.data.map(item => ({
          title: item.name,
          desc: item.description,
          path: `/${item.name.replace(/ /g, '')}`
        }));
        setFiturDetail(dimensiList);
      } catch (err) {
        console.error('API Error dimensi smartcity:', err);
        setLoadingFitur(false);
        // Fallback dihapus agar tidak tampil data palsu
        setFiturDetail([]);
      } finally {
        setLoadingFitur(false);
      }
    };

    fetchFiturUnggulan();
  }, [location.key]);

  useEffect(() => {
    setActive(null);
    window.scrollTo(0, 0);
  }, [location.key]);


  const handleClick = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
      // Scroll ke popup setelah render agar terlihat tanpa harus geser manual
      setTimeout(() => {
        const popup = document.querySelector('.fitur-popup');
        if (popup) {
          popup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  return (
    <div className="home">

      <section className="hero">
        <h1>
          Selamat Datang di Kabupaten Tangerang <br />
          Smart City
        </h1>

        <div className="hero-image">
          <img src={heroImage} alt="Kabupaten Tangerang" />
        </div>

        <div className="social-vertical">

          <a href="https://www.tiktok.com/@pemkabtangerang" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 15.67v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>

          <a href="https://instagram.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
            <Instagram size={22} />
          </a>

          <a href="https://youtube.com/@pemkabtangerang" target="_blank" rel="noopener noreferrer">
            <Youtube size={22} />
          </a>

        </div>
      </section>

      <section className="fitur" ref={detailRef}>
        <h2>
          Dimensi Smartcity
        </h2>

        {loadingFitur ? (
          <div className="loading">Memuat dimensi smartcity...</div>
        ) : (
          <div className="fitur-wrapper">
            {fiturDetail.map((detail, index) => {
              const icons = {
                'Smart Governance': smartGovernance,
                'Smart Living': smartLiving,
                'Smart Society': smartSociety,
                'Smart Economy': smartEconomy,
                'Smart Environment': smartEnvironment,
                'Smart Branding': smartBranding
              };
              const icon = icons[detail.title] || smartGovernance;
              return (
                <div
                  key={index}
                  className={`fitur-item ${active === index ? "active" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  <div className="dimensi-icon-circle">
                    <img src={icon} alt="" />
                  </div>
                  <p>{detail.title}</p>

                  {active === index && (
                    <div className="fitur-popup">
                      <div className="popup-arrow"></div>
                      <button
                        className="close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(null);
                        }}
                      >
                        ×
                      </button>
                      <h2>{detail.title}</h2>
                      <p>{detail.desc}</p>
                      <div className="popup-bottom">
                        <button
                          className="btn-kunjungan"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(detail.path);
                          }}
                        >
                          Kunjungi Halaman →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button className="btn-detail" onClick={() => navigate("/dimensi")}>
          Detail Dimensi →
        </button>

      </section>

      <section className="gemilang">
        <div className="gemilang-content">
          <p className="produk">
            Produk Unggulan Kami
          </p>

          <h2>
            Tangerang Gemilang # Membantu <br />

            Masyarakat Kabupaten Tangerang
          </h2>

          <p className="desc">
            Mewujudkan Tangerang masa depan dengan layanan digital terpadu dan teknologi modern
          </p>
        </div>

        <div className="gemilang-icons">
          <img src={lampuBiru} alt="" />
          <img src={lampuKuning} alt="" />
          <img src={lampuUngu} alt="" />
          <img src={hpIcon} alt="Preview Aplikasi" />
        </div>
      </section>

      <section className="virtual">
        <h2>
          Jelajahi Kabupaten Tangerang Secara Virtual
        </h2>

        <div className="virtual-box">

          <video autoPlay loop muted playsInline className="virtual-video">
            <source src={virtualTourVideo} type="video/mp4" />
          </video>

          <div className="virtual-box-text">
            Tangerang Smart City
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;