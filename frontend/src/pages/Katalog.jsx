import React from "react";
import "../styles/pages/katalog_page.css";
import { useLanguage } from "../utils/LanguageContext";

import smartImg from "../assets/images/smart.svg";
import websiteImg from "../assets/images/website.svg";

export default function KatalogSection() {
  const { language } = useLanguage();

  const katalogData = [
    {
      title: language === "ID" ? "Sistem Kunjungan Tamu" : "Guest Visit System",
      desc: language === "ID" ? "Pendataan dan Monitoring Tamu Instansi" : "Data Collection and Monitoring of Guest Institution",
      img: smartImg,
      link: "https://e-tamu.tangerangkab.my.id/"
    },
    {
      title: "Tangerang Gemilang",
      desc: language === "ID" ? "Layanan Cerdas untuk Masyarakat" : "Smart Services for Citizens",
      img: smartImg,
      link: "https://example.com/tangerang-gemilang"
    },
    {
      title: "Mata Hub",
      desc: language === "ID" ? "Smart Monitoring untuk Kabupaten Tangerang" : "Smart Monitoring for Tangerang Regency",
      img: smartImg,
      link: "https://cctv-dishub.tangerangkab.go.id/cctv"
    },
    {
      title: "D'Naker Digi",
      desc: language === "ID" ? "Digitalisasi Layanan Ketenagakerjaan" : "Digitalization of Employment Services",
      img: smartImg,
      link: "https://siapkerja.tangerangkab.go.id/home"
    },
    {
      title: "Geo Maps Kabupaten Tangerang",
      desc: language === "ID" ? "Peta Geografis Kabupaten Tangerang" : "Geographic Map of Tangerang Regency",
      img: smartImg,
      link: "https://geoportal.tangerangkab.go.id/",
      big: true
    }
  ];

  return (
    <section className="section-katalog">

      {/* HERO */}
      <div className="hero-wrapper">
        <div className="rectangle-top"></div>

        <div className="hero-center">
          <img src={websiteImg} alt="Mockup" />
        </div>

        <div className="rectangle-bottom"></div>
      </div>

      {/* LIST */}
      <div className="katalog-list">
        {katalogData.map((item, index) => (

          item.big ? (

            /* CARD KHUSUS GEOMAPS */
            <div className="katalog-item geomaps-item" key={index}>

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
            <div className="katalog-item" key={index}>

              <div className="item-image">
                <img src={item.img} alt={item.title} />
              </div>

              <div className="item-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="item-button">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {language === "ID" ? "Lihat Selengkapnya →" : "View More →"}
                </a>
              </div>

            </div>

          )

        ))}
      </div>

    </section>
  );
}

