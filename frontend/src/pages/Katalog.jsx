import React from "react";
import "../styles/pages/katalog_page.css";

const katalogData = [
  {
    title: "Sistem Kunjungan Tamu",
    desc: "Pendataan dan Monitoring Tamu Instansi",
    img: "/gambar/smart.svg",
    link: "https://e-tamu.tangerangkab.my.id/"
  },
  {
    title: "Tangerang Gemilang",
    desc: "Layanan Cerdas untuk Masyarakat",
    img: "/gambar/smart.svg",
    link: "https://example.com/tangerang-gemilang"
  },
  {
    title: "Mata Hub",
    desc: "Smart Monitoring untuk Kabupaten Tangerang",
    img: "/gambar/smart.svg",
    link: "https://cctv-dishub.tangerangkab.go.id/cctv"
  },
  {
    title: "D'Naker Digi",
    desc: "Digitalisasi Layanan Ketenagakerjaan",
    img: "/gambar/smart.svg",
    link: "https://siapkerja.tangerangkab.go.id/home"
  },
  {
    title: "Geo Maps Kabupaten Tangerang",
    img: "/gambar/smart.svg",
    link: "https://geoportal.tangerangkab.go.id/",
    big: true
  }
];

export default function KatalogSection() {
  return (
    <section className="section-katalog">

      {/* HERO */}
      <div className="hero-wrapper">
        <div className="rectangle-top"></div>

        <div className="hero-center">
          <img src="/gambar/website.svg" alt="Mockup" />
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
            Lihat Selengkapnya →
          </a>
        </div>

      </div>

    )

  ))}
</div>
    </section>
  );
}