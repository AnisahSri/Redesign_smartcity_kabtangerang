import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import "../styles/components/Home.css";

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

import virtualTourIcon from "../assets/icons/virtualtour.svg";

const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null); // ✅ TAMBAHAN

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="hero">
        <h1>
          Selamat Datang di Kabupaten Tangerang <br />
          Smart City
        </h1>

        <div className="hero-image">
          <img src={heroImage} alt="Kabupaten Tangerang" />
        </div>

        <div className="social-vertical">
          <Twitter size={22} />
          <Facebook size={22} />
          <Instagram size={22} />
          <Youtube size={22} />
        </div>
      </section>

      {/* ================= FITUR UNGGULAN ================= */}
      <section className="fitur">
        <h2>Fitur Unggulan Smart City</h2>

        <div className="fitur-wrapper">

          <div 
            className={`fitur-item ${active === 0 ? "active" : ""}`}
            onClick={() => {
              setActive(0);
              navigate("/SmartGovernance");
            }}
          >
            <div className="icon-circle">
              <img src={smartGovernance} alt="" />
            </div>
            <p>Smart Governance</p>
          </div>

          <div 
            className={`fitur-item ${active === 1 ? "active" : ""}`}
            onClick={() => {
              setActive(1);
              navigate("/SmartLiving");
            }}
          >
            <div className="icon-circle">
              <img src={smartLiving} alt="" />
            </div>
            <p>Smart Living</p>
          </div>

          <div 
            className={`fitur-item ${active === 2 ? "active" : ""}`}
            onClick={() => {
              setActive(2);
              navigate("/SmartSociety");
            }}
          >
            <div className="icon-circle">
              <img src={smartSociety} alt="" />
            </div>
            <p>Smart Society</p>
          </div>

          <div 
            className={`fitur-item ${active === 3 ? "active" : ""}`}
            onClick={() => {
              setActive(3);
              navigate("/SmartEconomy");
            }}
          >
            <div className="icon-circle">
              <img src={smartEconomy} alt="" />
            </div>
            <p>Smart Economy</p>
          </div>

          <div 
            className={`fitur-item ${active === 4 ? "active" : ""}`}
            onClick={() => {
              setActive(4);
              navigate("/SmartEnvironment");
            }}
          >
            <div className="icon-circle">
              <img src={smartEnvironment} alt="" />
            </div>
            <p>Smart Environment</p>
          </div>

          <div 
            className={`fitur-item ${active === 5 ? "active" : ""}`}
            onClick={() => {
              setActive(5);
              navigate("/SmartBranding");
            }}
          >
            <div className="icon-circle">
              <img src={smartBranding} alt="" />
            </div>
            <p>Smart Branding</p>
          </div>

        </div>

        <button className="btn-detail" onClick={() => navigate("/dimensi")}>
          Detail Dimensi →
        </button>
      </section>

      {/* ================= TANGERANG GEMILANG ================= */}
      <section className="gemilang">
        <div className="gemilang-content">
          <p className="produk">Produk Unggulan Kami</p>
          <h2>
            Tangerang Gemilang # Membantu <br />
            Masyarakat Kabupaten Tangerang
          </h2>

          <p className="desc">
            Mewujudkan Tangerang masa depan dengan layanan digital
            terpadu dan teknologi modern
          </p>
        </div>

        <div className="gemilang-icons">
          <img src={lampuBiru} alt="" />
          <img src={lampuKuning} alt="" />
          <img src={lampuUngu} alt="" />
          <img src={hpIcon} alt="Preview Aplikasi" />
        </div>
      </section>

      {/* ================= VIRTUAL TOUR ================= */}
      <section className="virtual">
        <h2>Jelajahi Kabupaten Tangerang Secara Virtual</h2>

        <div className="virtual-box">
          <img src={virtualTourIcon} alt="Virtual Tour" />
          <div className="running-text">
            <p> Virtual Tour - Kab. Tangerang</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
      </footer>

    </div>
  );
};

export default Home;