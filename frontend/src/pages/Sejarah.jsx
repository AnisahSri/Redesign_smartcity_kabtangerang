import React from "react";
import "../styles/pages/sejarah_page.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Sejarah() {
  return (
    <main className="sejarah-main">

      {/* HERO */}
      <div className="sejarah-hero">
        <img
          src="/gambar/website.svg"
          alt="Sejarah"
          className="sejarah-center-image"
        />
        <div className="hero-text">
          <h1>Sejarah</h1>
        </div>
      </div>

      {/*Kalimat Awal*/}
      <section className="kalimat-awal">
        <div className="container">
          <p>
            Smart City Kabupaten Tangerang hadir untuk mendukung transformasi digital daerah. 
            Kami memanfaatkan teknologi agar pelayanan publik jadi lebih mudah, cepat, dan transparan, 
            serta mendukung pembangunan daerah yang modern dan inovatif.
          </p>
        </div>
      </section>

      <div className="intro-card">
        <h2>Sejarah Smart City Kabupaten Tangerang</h2>

        <div className="intro-content">
          <div className="sejarah-image">
            <img src="/gambar/smart.svg" alt="Sejarah Smart City Kabupaten Tangerang" />
          </div>

          <p>
            Smart City Kabupaten Tangerang merupakan bagian dari program nasional 
            Gerakan Menuju 100 Smart City. Pemerintah daerah mengembangkan layanan 
            digital seperti e-Government untuk meningkatkan pelayanan publik agar 
            lebih cepat, transparan, dan terintegrasi.
          </p>
        </div>
      </div>

      {/* VISI MISI */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vm-wrapper">
            <h2>Visi dan Misi Smart City Kabupaten Tangerang</h2>

            <div className="vm-grid">
              <div className="vm-card">
                <h3>Visi</h3>
                <p>
                  Terwujudnya Kabupaten Tangerang sebagai Smart City yang 
                  terintegrasi, inovatif, dan berkelanjutan menuju masyarakat 
                  sejahtera dan berdaya saing global.
                </p>
              </div>

              <div className="vm-card">
                <h3>Misi</h3>
                <ol>
                  <li>Mengembangkan tata kelola pemerintahan yang cerdas.</li>
                  <li>Meningkatkan kualitas pelayanan publik digital.</li>
                  <li>Mendorong pertumbuhan ekonomi kreatif.</li>
                  <li>Mewujudkan lingkungan berkelanjutan.</li>
                  <li>Meningkatkan partisipasi masyarakat.</li>
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
                  Tangerang Smart City dari tahun ke tahun
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
                      image: "/gambar/smart.svg",
                      title: "Perencanaan",
                      desc: "Fase Perencanaan Studi kelayakan dan penyusunan masterplan SmartCity"
                    },
                    {
                      year: "2023",
                      image: "/gambar/smart.svg",
                      title: "Pengembangan",
                      desc: "Fase Pengembangan Pengembangan platform digital dan sistem informasi"
                    },
                    {
                      year: "2024",
                      image: "/gambar/smart.svg",
                      title: "Implementasi",
                      desc: "Fase Implementasi Peluncuran aplikasi layanan publik dan sistem monitoring kota"
                    },
                    {
                      year: "2025",
                      image: "/gambar/smart.svg",
                      title: "Integrasi",
                      desc: "Fase Integrasi Integrasi penuh semua dimensi SmartCity dan evaluasi komprehensif"
                    },
                    {
                      year: "2026",
                      image: "/gambar/smart.svg",
                      title: "Optimalisasi",
                      desc: "Fase Optimalisasi Studi kelayakan dan penyusunan masterplan SmartCity"
                    }
                  ].map((item, i) => (
                    <SwiperSlide key={i}>
                      <div className="roadmap-item">

                        <div className="roadmap-logo">
                          <img src="/gambar/line.svg" alt="timeline" />
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

                {/* BUTTON DI BAWAH KANAN */}
                <div className="swiper-nav-right">
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </div>
          </div>
        </section>
    </main>
  );
}