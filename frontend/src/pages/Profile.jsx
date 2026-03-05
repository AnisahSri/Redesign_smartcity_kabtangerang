import React, { useEffect, useRef } from "react";
import "../styles/pages/profile_page.css";
import { Link } from 'react-router-dom';

export default function Profile() {
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    initializeAnimations();

    // Cleanup function yang lebih komprehensif
    return () => {
      // Disconnect observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      // Reset semua inline styles yang ditambahkan
      const allElements = document.querySelectorAll(
        ".profile-overview-section, .vision-mission-section, .timeline-section, .vm-card, .timeline-item, .stat-number, .stat-item"
      );
      
      allElements.forEach(element => {
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
    // Disconnect observer lama jika ada
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          if (entry.target.classList.contains("stat-number")) {
            animateStatNumber(entry.target);
          }
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const sections = document.querySelectorAll(
      ".profile-overview-section, .vision-mission-section, .timeline-section"
    );
    sections.forEach(section => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";
      section.style.transition = "opacity 1s ease, transform 1s ease";
      observerRef.current.observe(section);
    });

    const cards = document.querySelectorAll(".vm-card, .timeline-item");
    cards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observerRef.current.observe(card);
    });

    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => observerRef.current.observe(stat));
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
      // Check jika element masih ada di DOM
      if (!element || !document.body.contains(element)) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
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

  const handleCardClick = (className) => {
    const cards = document.querySelectorAll(`.${className}`);
    cards.forEach(card => {
      card.style.animation = "pulse 0.6s ease-in-out";
      setTimeout(() => {
        if (card && document.body.contains(card)) {
          card.style.animation = "";
        }
      }, 600);
    });
  };

  const handleKeyDown = (e, className) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(className);
    }
  };

  return (
    <main className="profile-main">
  {/* ================= HERO PROFILE ================= */}
      <div className="profile-hero">
        <img
          src="/gambar/website.svg"
          alt="Profile"
          className="profile-center-image"
        />
        <div className="hero-text">
          <h1>Tentang Kami</h1>
        </div>
      </div>

      <section className="profile-overview-section">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2>Jejak Transformasi Kabupaten Tangerang Tentang Smart City</h2>
              <p>
                Kabupaten Tangerang Smart City hadir untuk mendukung transformasi digital daerah. 
                Kami memanfaatkan teknologi agar pelayanan publik jadi lebih mudah, cepat, dan transparan, serta mendukung pembangunan daerah yang modern dan inovatif.
              </p>

          <Link to="/sejarah">
                <button className="btn-sejarah">
                  Sejarah KTSC →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="highlight-section">
        <div className="container highlight-grid">
          <div className="highlight-content">
              <h3>Hai Hai Hai...</h3>
                <h2>Kenalin Nih SuperApp nya Kabupaten Tangerang!</h2>

                <div className="highlight-stats">
                  <div className="highlight-item">
                    <img src="/public/icon/iconlayanan.svg" alt="Layanan" className="highlight-icon" />
                    <span className="highlight-number">17</span>
                    <p>Layanan</p>
                  </div>

                  <div className="highlight-item">
                    <img src="/public/icon/iconlaporan.svg" alt="Laporan" className="highlight-icon" />
                    <span className="highlight-number">26+</span>
                    <p>Laporan Dari Masyarakat</p>
                  </div>

                  <div className="highlight-item">
                    <img src="/public/icon/iconunduh.svg" alt="Unduh" className="highlight-icon" />
                    <span className="highlight-number">50rb+</span>
                    <p>Masyarakat Mengunduh</p>
                  </div>
                </div>
              </div>
              <div className="highlight-image">
                <img src="/gambar/hp.svg" alt="App Preview" />
                <h4>#Kabupaten Tangerang Membantu</h4>
                <h4>Unduh Tangerang Gemilang :</h4>
                
                <div className="store-buttons">
                  <img src="/gambar/googleplay.svg" alt="Google Play" />
                  <img src="/gambar/appstore.svg" alt="App Store" />
                </div>
              </div>
            </div>
      </section>

        <div className="logo-between">
          <img src="/gambar/logoo.svg" alt="Logo" />
        </div>

        <section className="coverage-section">
          <div className="container">
            <h2 className="section-title">
              Cakupan Data Kabupaten Tangerang Smart City
            </h2>

          <div className="coverage-grid">

              <a 
                href="https://geoportal.tangerangkab.go.id/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="coverage-card"
              >
                <div className="stat-number">959 KM²</div>
                <div className="stat-label">Luas Wilayah</div>
              </a>

                <div className="coverage-card">
                  <div className="stat-number">1.5JT+</div>
                  <div className="stat-label">Penduduk</div>
                </div>

                <div className="coverage-card">
                  <div className="stat-number">29</div>
                  <div className="stat-label">Kecamatan</div>
                </div>

                <div className="coverage-card">
                  <div className="stat-number">246</div>
                  <div className="stat-label">Kelurahan / Desa</div>
                </div>

            </div>
          </div>
        </section>
    </main>
  );
}