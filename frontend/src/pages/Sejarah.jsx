import React from "react";
import "../styles/pages/sejarah_page.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useLanguage } from "../utils/LanguageContext";

/* IMPORT GAMBAR DARI ASSETS */
import websiteImg from "../assets/images/website.svg";
import smartImg from "../assets/images/smart.svg";
import lineImg from "../assets/images/line.svg";

export default function Sejarah() {
  const { language } = useLanguage();

  return (
    <main className="sejarah-main">

      {/* HERO */}
      <div className="sejarah-hero">
        <img
          src={websiteImg}
          alt="Sejarah"
          className="sejarah-center-image"
        />
        <div className="hero-text">
          <h1>{language === "ID" ? "Sejarah" : "History"}</h1>
        </div>
      </div>

      {/*Kalimat Awal*/}
      <section className="kalimat-awal">
        <div className="container">
          <p>
            {language === "ID" 
              ? "Smart City Kabupaten Tangerang hadir untuk mendukung transformasi digital daerah. Kami memanfaatkan teknologi agar pelayanan publik jadi lebih mudah, cepat, dan transparan, serta mendukung pembangunan daerah yang modern dan inovatif."
              : "Tangerang Regency Smart City is here to support regional digital transformation. We leverage technology to make public services easier, faster, and more transparent, as well as supporting modern and innovative regional development."}
          </p>
        </div>
      </section>

      <div className="intro-card">
        <h2>{language === "ID" ? "Sejarah Smart City Kabupaten Tangerang" : "History of Tangerang Regency Smart City"}</h2>

        <div className="intro-content">
          <div className="sejarah-image">
            <img src={smartImg} alt="Sejarah Smart City Kabupaten Tangerang" />
          </div>

          <p>
            {language === "ID" 
              ? "Smart City Kabupaten Tangerang merupakan bagian dari program nasional Gerakan Menuju 100 Smart City. Pemerintah daerah mengembangkan layanan digital seperti e-Government untuk meningkatkan pelayanan publik agar lebih cepat, transparan, dan terintegrasi."
              : "Tangerang Regency Smart City is part of the national program Movement Towards 100 Smart Cities. The local government develops digital services such as e-Government to improve public services to be faster, transparent, and integrated."}
          </p>
        </div>
      </div>

      {/* VISI MISI */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vm-wrapper">
            <h2>{language === "ID" ? "Visi dan Misi Smart City Kabupaten Tangerang" : "Vision and Mission of Tangerang Regency Smart City"}</h2>

            <div className="vm-grid">
              <div className="vm-card">
                <h3>{language === "ID" ? "Visi" : "Vision"}</h3>
                <p>
                  {language === "ID" 
                    ? "Terwujudnya Kabupaten Tangerang sebagai Smart City yang terintegrasi, inovatif, dan berkelanjutan menuju masyarakat sejahtera dan berdaya saing global."
                    : "Realization of Tangerang Regency as an integrated, innovative, and sustainable Smart City towards a prosperous society and globally competitive."}
                </p>
              </div>

              <div className="vm-card">
                <h3>{language === "ID" ? "Misi" : "Mission"}</h3>
                <ol>
                  <li>{language === "ID" ? "Mengembangkan tata kelola pemerintahan yang cerdas." : "Develop smart governance."}</li>
                  <li>{language === "ID" ? "Meningkatkan kualitas pelayanan publik digital." : "Improve quality of digital public services."}</li>
                  <li>{language === "ID" ? "Mendorong pertumbuhan ekonomi kreatif." : "Drive creative economy growth."}</li>
                  <li>{language === "ID" ? "Mewujudkan lingkungan berkelanjutan." : "Realize sustainable environment."}</li>
                  <li>{language === "ID" ? "Meningkatkan partisipasi masyarakat." : "Increase community participation."}</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="roadmap-section">
        <div className="roadmap-wrapper">
          <h2 className="roadmap-title">
            {language === "ID" ? "Tangerang Smart City dari tahun ke tahun" : "Tangerang Smart City Over the Years"}
          </h2>

          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="roadmap-swiper"
          >
            {[
              {
                year: "2022",
                image: smartImg,
                title: language === "ID" ? "Perencanaan" : "Planning",
                desc: language === "ID" 
                  ? "Fase Perencanaan Studi kelayakan dan penyusunan masterplan SmartCity"
                  : "Planning Phase Feasibility study and SmartCity masterplan preparation"
              },
              {
                year: "2023",
                image: smartImg,
                title: language === "ID" ? "Pengembangan" : "Development",
                desc: language === "ID" 
                  ? "Fase Pengembangan Pengembangan platform digital dan sistem informasi"
                  : "Development Phase Development of digital platforms and information systems"
              },
              {
                year: "2024",
                image: smartImg,
                title: language === "ID" ? "Implementasi" : "Implementation",
                desc: language === "ID" 
                  ? "Fase Implementasi Peluncuran aplikasi layanan publik dan sistem monitoring kota"
                  : "Implementation Phase Launch of public service applications and city monitoring systems"
              },
              {
                year: "2025",
                image: smartImg,
                title: language === "ID" ? "Integrasi" : "Integration",
                desc: language === "ID" 
                  ? "Fase Integrasi Integrasi penuh semua dimensi SmartCity dan evaluasi komprehensif"
                  : "Integration Phase Full integration of all SmartCity dimensions and comprehensive evaluation"
              },
              {
                year: "2026",
                image: smartImg,
                title: language === "ID" ? "Optimalisasi" : "Optimization",
                desc: language === "ID" 
                  ? "Fase Optimalisasi Studi kelayakan dan penyusunan masterplan SmartCity"
                  : "Optimization Phase Feasibility study and SmartCity masterplan preparation"
              }
            ].map((item, i) => (
              <SwiperSlide key={i}>
                <div className="roadmap-item">

                  <div className="roadmap-logo">
                    <img src={lineImg} alt="timeline" />
                  </div>

                  <div className="roadmap-card">
                    <h3 className="roadmap-year">{item.year}</h3>
                    <div className="year-line"></div>

                    <div className="roadmap-image">
                      <img src={item.image} alt={item.title} />
                    </div>

                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-nav-right">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>

    </main>
  );
}