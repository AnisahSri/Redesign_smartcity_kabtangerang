import React, { useEffect, useState } from "react";
import "../styles/pages/persona_page.css";

export default function Persona() {
  const [activeTab, setActiveTab] = useState("aparatur");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    initializeAnimations();
    setupIntersectionObservers();
  }, []);

  const initializeAnimations = () => {
    const introSection = document.querySelector(".persona-hero");
    if (introSection) {
      introSection.style.opacity = "0";
      introSection.style.transform = "translateY(30px)";
      setTimeout(() => {
        introSection.style.transition =
          "opacity 0.8s ease, transform 0.8s ease";
        introSection.style.opacity = "1";
        introSection.style.transform = "translateY(0)";
      }, 100);
    }
  };

  const setupIntersectionObservers = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const personCards = document.querySelectorAll(".person-card");
    personCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTimeout(setupIntersectionObservers, 50);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase().trim());
    setTimeout(setupIntersectionObservers, 50);
  };

  return (
    <div className="persona-container">
      {/* HERO SECTION */}
      <section className="persona-hero">
        <div className="persona-hero-overlay"></div>
        <div className="persona-hero-content">
          <h1 className="persona-hero-title">
            Tim SmartCity Kabupaten Tangerang
          </h1>
          <p className="persona-hero-subtitle">
            Struktur organisasi SmartCity Kabupaten Tangerang yang terdiri dari
            berbagai divisi dan unit kerja yang berkolaborasi untuk mewujudkan
            kota cerdas yang terintegrasi dan berkelanjutan.
          </p>
        </div>
      </section>

      {/* TAB SECTION */}
      <section className="persona-tabs-section">
        <div className="persona-tabs-container">
          <button
            className={`persona-tab ${
              activeTab === "aparatur" ? "active" : ""
            }`}
            onClick={() => handleTabClick("aparatur")}
          >
            Aparatur Sipil Negara
          </button>
          <button
            className={`persona-tab ${
              activeTab === "ahli" ? "active" : ""
            }`}
            onClick={() => handleTabClick("ahli")}
          >
            Tenaga Ahli
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="persona-main">
        <div className="persona-grid">
          {[...Array(6)].map((_, i) => (
            <div className="person-card" key={i}>
              <div className="person-avatar"></div>
              <h3 className="person-name">
                {i === 0
                  ? "Dr. H. Ahmad Zaki Iskandar, S.T., M.T."
                  : i === 1
                  ? "Dra. Siti Nurhaliza, M.M."
                  : i === 2
                  ? "Ir. Muhammad Rizki Pratama, M.T."
                  : `Nama Persona ${i + 1}`}
              </h3>
              <p className="person-role">
                {i === 0
                  ? "Kepala Dinas Komunikasi dan Informatika"
                  : i === 1
                  ? "Sekretaris Dinas"
                  : i === 2
                  ? "Kepala Bidang Teknologi Informasi"
                  : "Anggota Tim SmartCity"}
              </p>
              <p className="person-desc">
                {i === 0
                  ? "Memimpin dan mengkoordinasikan seluruh program SmartCity di Kabupaten Tangerang."
                  : i === 1
                  ? "Mengelola administrasi dan koordinasi internal dinas untuk mendukung program SmartCity."
                  : i === 2
                  ? "Bertanggung jawab atas pengembangan infrastruktur teknologi dan sistem informasi SmartCity."
                  : "Berperan aktif dalam pengembangan dan implementasi SmartCity di Kabupaten Tangerang."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}