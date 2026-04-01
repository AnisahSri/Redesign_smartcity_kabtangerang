import React, { useEffect, useRef } from "react";
import "../styles/pages/profile_page.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../utils/LanguageContext";

/* IMPORT GAMBAR */
import websiteImg from "../assets/images/website.svg";
import hpImg from "../assets/images/hp.svg";
import googlePlayImg from "../assets/images/googleplay.svg";
import appStoreImg from "../assets/images/appstore.svg";
import logoImg from "../assets/images/logoo.svg";

import iconLayanan from "../assets/icon/iconlayanan.svg";
import iconLaporan from "../assets/icon/iconlaporan.svg";
import iconUnduh from "../assets/icon/iconunduh.svg";

export default function Profile() {
  const { language } = useLanguage();
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    initializeAnimations();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      const allElements = document.querySelectorAll(
        ".profile-overview-section, .vision-mission-section, .timeline-section, .vm-card, .timeline-item, .stat-number, .stat-item"
      );

      allElements.forEach((element) => {
        if (element) {
          element.style.opacity = "";
          element.style.transform = "";
          element.style.transition = "";
          element.style.animation = "";
        }
      });
    };
  }, []);

  const initializeAnimations = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            if (entry.target.classList.contains("stat-number")) {
              animateStatNumber(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const sections = document.querySelectorAll(
      ".profile-overview-section, .vision-mission-section, .timeline-section"
    );

    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";
      section.style.transition = "opacity 1s ease, transform 1s ease";
      observerRef.current.observe(section);
    });

    const cards = document.querySelectorAll(".vm-card, .timeline-item");

    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `opacity 0.6s ease ${
        index * 0.1
      }s, transform 0.6s ease ${index * 0.1}s`;

      observerRef.current.observe(card);
    });

    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => observerRef.current.observe(stat));
  };

  const animateStatNumber = (element) => {
    const finalValue = element.textContent;
    let numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ""));
    let suffix = finalValue.replace(/[\d.]/g, "").replace(/\s/g, "");

    if (finalValue.includes("M") || finalValue.includes("m")) {
      numericValue *= 1000000;
      suffix = "+";
    } else if (finalValue.includes("K") || finalValue.includes("k")) {
      numericValue *= 1000;
      suffix = "+";
    }

    if (isNaN(numericValue)) numericValue = parseInt(finalValue) || 0;

    animateNumber(element, 0, numericValue, suffix, 2000);
  };

  const animateNumber = (element, start, end, suffix, duration) => {
    const startTime = performance.now();
    let animationFrameId;

    const update = (time) => {
      if (!element || !document.body.contains(element)) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * ease);

      let display = current.toLocaleString();

      if (end >= 1000000) display = (current / 1000000).toFixed(1) + "M";
      else if (end >= 1000) display = Math.floor(current / 1000) + "K";

      element.textContent = display + (suffix || "");

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    animationFrameId = requestAnimationFrame(update);
  };

  return (
    <main className="profile-main">

      {/* HERO */}
      <div className="profile-hero">
        <img
          src={websiteImg}
          alt="Profile"
          className="profile-center-image"
        />
        <div className="hero-text">
          <h1>{language === "ID" ? "Tentang Kami" : "About Us"}</h1>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="profile-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>
                {language === "ID" 
                  ? "Jejak Transformasi Kabupaten Tangerang Tentang Smart City"
                  : "Transformation Journey of Tangerang Regency Smart City"}
              </h2>

              <p>
                {language === "ID" 
                  ? "Kabupaten Tangerang Smart City hadir untuk mendukung transformasi digital daerah. Kami memanfaatkan teknologi agar pelayanan publik jadi lebih mudah, cepat, dan transparan, serta mendukung pembangunan daerah yang modern dan inovatif."
                  : "Tangerang Regency Smart City is here to support regional digital transformation. We leverage technology to make public services easier, faster, and more transparent, as well as supporting modern and innovative regional development."}
              </p>

              <Link to="/sejarah">
                <button className="btn-sejarah">
                  {language === "ID" ? "Sejarah KTSC →" : "KTSC History →"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUPERAPP */}
      <section className="highlight-section">
        <div className="container highlight-grid">

          <div className="highlight-content">
            <h3>{language === "ID" ? "Hai Hai Hai..." : "Hi Hi Hi..."}</h3>
            <h2>{language === "ID" ? "Kenalin Nih SuperApp nya Kabupaten Tangerang!" : "Introducing Tangerang Regency's SuperApp!"}</h2>

            <div className="highlight-stats">

              <div className="highlight-item">
                <img src={iconLayanan} alt="Layanan" className="highlight-icon" />
                <span className="highlight-number">17</span>
                <p>{language === "ID" ? "Layanan" : "Services"}</p>
              </div>

              <div className="highlight-item">
                <img src={iconLaporan} alt="Laporan" className="highlight-icon" />
                <span className="highlight-number">26+</span>
                <p>{language === "ID" ? "Laporan Dari Masyarakat" : "Reports from Community"}</p>
              </div>

              <div className="highlight-item">
                <img src={iconUnduh} alt="Unduh" className="highlight-icon" />
                <span className="highlight-number">50rb+</span>
                <p>{language === "ID" ? "Masyarakat Mengunduh" : "Downloads by Citizens"}</p>
              </div>

            </div>
          </div>

          <div className="highlight-image">
            <img src={hpImg} alt="App Preview" />

            <h4>#{language === "ID" ? "Kabupaten Tangerang Membantu" : "Tangerang Regency Helps"}</h4>
            <h4>{language === "ID" ? "Unduh Tangerang Gemilang :" : "Download Tangerang Gemilang :"}</h4>

            <div className="store-buttons">
              <img src={googlePlayImg} alt="Google Play" />
              <img src={appStoreImg} alt="App Store" />
            </div>
          </div>

        </div>
      </section>

      {/* LOGO */}
      <div className="logo-between">
        <img src={logoImg} alt="Logo" />
      </div>

      {/* COVERAGE */}
      <section className="coverage-section">
        <div className="container">

          <h2 className="section-title">
            {language === "ID" 
              ? "Cakupan Data Kabupaten Tangerang Smart City"
              : "Tangerang Regency Smart City Data Coverage"}
          </h2>

          <div className="coverage-grid">

            <a
              href="https://geoportal.tangerangkab.go.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="coverage-card"
            >
              <div className="stat-number">959 KM²</div>
              <div className="stat-label">{language === "ID" ? "Luas Wilayah" : "Area"}</div>
            </a>

            <div className="coverage-card">
              <div className="stat-number">1.5JT+</div>
              <div className="stat-label">{language === "ID" ? "Penduduk" : "Population"}</div>
            </div>

            <div className="coverage-card">
              <div className="stat-number">29</div>
              <div className="stat-label">{language === "ID" ? "Kecamatan" : "Districts"}</div>
            </div>

            <div className="coverage-card">
              <div className="stat-number">246</div>
              <div className="stat-label">{language === "ID" ? "Kelurahan / Desa" : "Villages"}</div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}