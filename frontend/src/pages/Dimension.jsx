import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import iconsDimensi from "../assets/icons/icondimensi.svg";
import backgroundDimensi from "../assets/images/background_dimensi.svg";

/* ====== ICON FITUR UNGGULAN ====== */
import smartGovernance from "../assets/icons/smartgovernance.svg";
import smartLiving from "../assets/icons/smartliving.svg";
import smartSociety from "../assets/icons/smartsociety.svg";
import smartEconomy from "../assets/icons/smarteconomy.svg";
import smartEnvironment from "../assets/icons/smartenvironment.svg";
import smartBranding from "../assets/icons/smartbranding.svg";

import "../styles/pages/home_page.css";
import "../styles/pages/dimension_page.css";
import "../styles/components/Home.css";

function Dimension() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const detailRef = useRef(null);

  const fiturDetail = [
    {
      title: "Smart Governance",
      desc: "Smart Governance adalah sistem tata kelola pemerintahan berbasis teknologi yang transparan dan efisien.",
      path: "/SmartGovernance",
    },
    {
      title: "Smart Living",
      desc: "Smart Living meningkatkan kualitas hidup masyarakat melalui layanan digital dan infrastruktur cerdas.",
      path: "/SmartLiving",
    },
    {
      title: "Smart Society",
      desc: "Smart Society membangun masyarakat yang aktif, inklusif, dan melek teknologi.",
      path: "/SmartSociety",
    },
    {
      title: "Smart Economy",
      desc: "Smart Economy mendorong pertumbuhan ekonomi berbasis inovasi dan digitalisasi.",
      path: "/SmartEconomy",
    },
    {
      title: "Smart Environment",
      desc: "Smart Environment berfokus pada pengelolaan lingkungan yang berkelanjutan.",
      path: "/SmartEnvironment",
    },
    {
      title: "Smart Branding",
      desc: "Smart Branding meningkatkan citra daerah melalui strategi komunikasi dan digital branding.",
      path: "/SmartBranding",
    },
  ];

  const handleClick = (index) => {
    setActive(index);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="dimensi" className="dimensi-section">

      {/* ================= HERO ATAS ================= */}
      <div className="dimensi-hero">
        <div className="hero-text">
          <h1>Dimensi Smart City</h1>
        </div>

        <img
          src={backgroundDimensi}
          alt="Dimensi Smart City"
          className="dimensi-center-image"
        />
      </div>

      {/* ================= SECTION BAWAH ================= */}
      <div className="dimensi-info">
        <div className="dimensi-info-container">

          <img 
            src={iconsDimensi} 
            alt="Icon Dimensi" 
            className="dimensi-info-icon"
          />

          <div className="dimensi-info-text">
            <h2>Dimensi Smart City</h2>
            <p>
              Mendefinisikan pilar-pilar penting untuk mewujudkan
              Kabupaten Tangerang sebagai kota pintar yang
              terintegrasi dan berkelanjutan.
            </p>
          </div>

        </div>
      </div>

      {/* ================= FITUR UNGGULAN ================= */}
      <section className="fitur">
        <h2>Fitur Unggulan Smart City</h2>

        <div className="fitur-wrapper">

          <div className={`fitur-item ${active === 0 ? "active" : ""}`}
            onClick={() => handleClick(0)}>
            <div className="icon-circle">
              <img src={smartGovernance} alt="" />
            </div>
            <p>Smart Governance</p>
          </div>

          <div className={`fitur-item ${active === 1 ? "active" : ""}`}
            onClick={() => handleClick(1)}>
            <div className="icon-circle">
              <img src={smartLiving} alt="" />
            </div>
            <p>Smart Living</p>
          </div>

          <div className={`fitur-item ${active === 2 ? "active" : ""}`}
            onClick={() => handleClick(2)}>
            <div className="icon-circle">
              <img src={smartSociety} alt="" />
            </div>
            <p>Smart Society</p>
          </div>

          <div className={`fitur-item ${active === 3 ? "active" : ""}`}
            onClick={() => handleClick(3)}>
            <div className="icon-circle">
              <img src={smartEconomy} alt="" />
            </div>
            <p>Smart Economy</p>
          </div>

          <div className={`fitur-item ${active === 4 ? "active" : ""}`}
            onClick={() => handleClick(4)}>
            <div className="icon-circle">
              <img src={smartEnvironment} alt="" />
            </div>
            <p>Smart Environment</p>
          </div>

          <div className={`fitur-item ${active === 5 ? "active" : ""}`}
            onClick={() => handleClick(5)}>
            <div className="icon-circle">
              <img src={smartBranding} alt="" />
            </div>
            <p>Smart Branding</p>
          </div>

        </div>

        {/* ===== POPUP DETAIL ===== */}
        {active !== null && (
          <div className="fitur-popup" ref={detailRef}>

            <button 
              className="close-btn"
              onClick={() => setActive(null)}
            >
              ✕
            </button>

            <h2>{fiturDetail[active].title}</h2>

            <p>{fiturDetail[active].desc}</p>

            <div className="popup-bottom">
              <button
                className="btn-kunjungan"
                onClick={() => navigate(fiturDetail[active].path)}
              >
                Kunjungi Halaman →
              </button>
            </div>

          </div>
        )}

        {/* ===== BUTTON DETAIL DIMENSI ===== */}
        <button 
          className="btn-detail"
          onClick={() => navigate("/dimensi")}
        >
          Detail Dimensi →
        </button>

      </section>

    </section>
  );
}

export default Dimension;