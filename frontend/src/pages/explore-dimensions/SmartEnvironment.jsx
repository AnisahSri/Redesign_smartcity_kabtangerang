import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backgroundKunjungan from "../../assets/images/background_kunjungan.svg";
import backgroundBerita from "../../assets/images/background_berita.svg";

/* ICON */
import smartGovernance from "../../assets/icons/smartgovernance.svg";
import smartLiving from "../../assets/icons/smartliving.svg";
import smartSociety from "../../assets/icons/smartsociety.svg";
import smartEconomy from "../../assets/icons/smarteconomy.svg";
import smartEnvironment from "../../assets/icons/smartenvironment.svg";
import smartBranding from "../../assets/icons/smartbranding.svg";

import "../../styles/pages/smartgovernance_page.css";

function SmartEnvironment() {
  const [selectedCategory, setSelectedCategory] = useState("berita");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedInnovation, setSelectedInnovation] = useState(null);

  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const totalSlide = 3;

  const scrollToIndex = (index) => {
    const container = scrollRef.current;
    const width = container.offsetWidth;
    container.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const scrollRight = () => {
    if (activeIndex < totalSlide - 1) scrollToIndex(activeIndex + 1);
  };

  return (
    <div className="kunjungan-wrapper">

      {/* HERO */}
      <section className="kunjungan-hero">
        <div className="kunjungan-blue">
          <h1>Smart Environment</h1>
        </div>

        <div className="kunjungan-content">
          <img
            src={backgroundKunjungan}
            alt="Smart Environment"
            className="kunjungan-image"
          />

          {/* ===== BREADCRUMB (POSISI BARU) ===== */}
          <div className="smart-breadcrumb">
            <span onClick={() => navigate("/")}>Beranda</span>
            <span className="dot">•</span>
            <span onClick={() => navigate("/Dimensi")}>Dimensi</span>
            <span className="dot">•</span>
            <span className="active">Smart Environment</span>
          </div>

          <div className="kunjungan-fitur">
            <div className="kunjungan-icons">
              <div className="fitur-item" onClick={() => navigate("/SmartGovernance")}>
                <div className="icon-circle">
                  <img src={smartGovernance} alt="" />
                </div>
                <span>Smart Governance</span>
              </div>

              <div className="fitur-item" onClick={() => navigate("/SmartLiving")}>
                <div className="icon-circle">
                  <img src={smartLiving} alt="" />
                </div>
                <span>Smart Living</span>
              </div>

              <div className="fitur-item" onClick={() => navigate("/SmartSociety")}>
                <div className="icon-circle">
                  <img src={smartSociety} alt="" />
                </div>
                <span>Smart Society</span>
              </div>

              <div className="fitur-item" onClick={() => navigate("/SmartEconomy")}>
                <div className="icon-circle">
                  <img src={smartEconomy} alt="" />
                </div>
                <span>Smart Economy</span>
              </div>

              <div className="fitur-item active">
                <div className="icon-circle">
                  <img src={smartEnvironment} alt="" />
                </div>
                <span>Smart Environment</span>
              </div>

              <div className="fitur-item" onClick={() => navigate("/SmartBranding")}>
                <div className="icon-circle">
                  <img src={smartBranding} alt="" />
                </div>
                <span>Smart Branding</span>
              </div>
            </div>

            <div className="kunjungan-tab">
              <button
                className={selectedCategory === "berita" ? "active" : ""}
                onClick={() => setSelectedCategory("berita")}
              >
                Berita
              </button>

              <button
                className={selectedCategory === "inovasi" ? "active" : ""}
                onClick={() => setSelectedCategory("inovasi")}
              >
                Inovasi
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* BERITA */}
      {selectedCategory === "berita" && (
        <section className="berita-section">
          <div className="berita-scroll-wrapper" ref={scrollRef}>
            {Array.from({ length: totalSlide }).map((_, slideIndex) => (
              <div key={slideIndex} className="berita-slide">
                {[0, 1, 2].map((itemIndex) => {
                  const globalIndex = slideIndex * 3 + itemIndex;
                  const isBlue = globalIndex % 2 === 0;

                  return (
                    <div
                      key={itemIndex}
                      className={`berita-row ${isBlue ? "biru-row" : "putih-row"}`}
                    >
                      <div className="berita-content">
                        <h2>Peluncuran Platform SmartCity Tangerang 2025</h2>
                        <p>
                          Lorem ipsum dolor sit amet consectetur.
                          In pharetra aliquam adipiscing sed nisl.
                        </p>
                      </div>

                      <div className="berita-image">
                        <img src={backgroundBerita} alt="Berita" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="berita-pagination">
            <button onClick={scrollLeft}>{"<<"}</button>

            {Array.from({ length: totalSlide }).map((_, index) => (
              <button
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => scrollToIndex(index)}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={scrollRight}>{">>"}</button>
          </div>
        </section>
      )}

      {/* INOVASI */}
      {selectedCategory === "inovasi" && (
        <section className="inovasi-section">
          <div className="inovasi-grid">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="inovasi-card"
                onClick={() => setSelectedInnovation(backgroundBerita)}
              >
                <img src={backgroundBerita} alt="Inovasi" />
                <div className="inovasi-overlay">
                  <h3>Digitalisasi Layanan Publik</h3>
                </div>
              </div>
            ))}
          </div>

          {selectedInnovation && (
            <div
              className="inovasi-modal"
              onClick={() => setSelectedInnovation(null)}
            >
              <img src={selectedInnovation} alt="Preview" />
            </div>
          )}
        </section>
      )}

    </div>
  );
}

export default SmartEnvironment;