import React from "react";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import "../../styles/components/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top-line"></div>

      <div className="footer-content">
        {/* Kolom 1 */}
        <div className="footer-section">
          <img
            src="/public/gambar/logo.svg"   // pastikan ada di folder public
            alt="Logo Smart City"
            className="footer-logo"
          />

          <h4>Alamat</h4>
          <p>
            Jl. H. Somawinata No.1, Gedung Smart Building Puspemkab Tangerang,
            Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720, Indonesia
          </p>

          <h4>Kontak</h4>
          <p>Telepon : +62 811-1031-632</p>
          <p>Email : diskominfo@tangerangkab.go.id</p>
        </div>

        {/* Kolom 2 */}
        <div className="footer-section social-section">
          <h4>Temukan kami di sosial media</h4>

          <div className="social-icons">
            <a href="https://x.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>

            <a href="https://facebook.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>

            <a href="https://www.tiktok.com/@pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 15.67v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>

            <a href="https://instagram.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>

            <a href="https://youtube.com/@pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Kolom 3 */}
        <div className="footer-section store-section">
          <h4>Blog</h4>

          <h4>Jam Operasional Pelayanan</h4>
          <p>Senin - Jumat: 07.30 - 16.30 WIB</p>

          <h4>Website Resmi</h4>
          <a
            href="https://diskominfo.tangerangkab.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            diskominfo.tangerangkab.go.id
          </a>

          <h4>Unduh Tangerang Gemilang</h4>
          <div className="store-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=go.id.tangerangkab.gemilang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/public/gambar/googleplay.svg"
                alt="Download di Google Play"
              />
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src="/public/gambar/appstore.svg"
                alt="Download di App Store"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;