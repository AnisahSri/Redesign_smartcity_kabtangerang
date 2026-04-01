import React from "react";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import "../../styles/components/footer.css";

import logoImg from "../../assets/images/logo.svg";
import googlePlayImg from "../../assets/images/googleplay.svg";
import appStoreImg from "../../assets/images/appstore.svg";
import { useLanguage } from "../../utils/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-top-line"></div>

      <div className="footer-content">
        {/* Kolom 1 */}
        <div className="footer-section">
          <img
            src={logoImg}
            alt="Logo Smart City"
            className="footer-logo"
          />

          <h4>{language === "ID" ? "Alamat" : "Address"}</h4>
          <p>
            {language === "ID" 
              ? "Jl. H. Somawinata No.1, Gedung Smart Building Puspemkab Tangerang, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720, Indonesia"
              : "Jl. H. Somawinata No.1, Smart Building Puspemkab Tangerang, Tigaraksa District, Tangerang Regency, Banten 15720, Indonesia"
            }
          </p>

          <h4>{language === "ID" ? "Kontak" : "Contact"}</h4>
          <p>{language === "ID" ? "Telepon" : "Phone"} : +62 811-1031-632</p>
          <p>Email : diskominfo@tangerangkab.go.id</p>
        </div>

        {/* Kolom 2 */}
        <div className="footer-section social-section">
          <h4>{language === "ID" ? "Temukan kami di sosial media" : "Find us on social media"}</h4>

          <div className="social-icons">
            <a href="https://x.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>

            <a href="https://facebook.com/pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>

            <a href="https://www.tiktok.com/@pemkabtangerang" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 1 0 15.86 15.67v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.10z"/>
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

          <h4>{language === "ID" ? "Jam Operasional Pelayanan" : "Service Operating Hours"}</h4>
          <p>{language === "ID" ? "Senin - Jumat: 07.30 - 16.30 WIB" : "Monday - Friday: 07.30 - 16.30 WIB"}</p>

          <h4>{language === "ID" ? "Website Resmi" : "Official Website"}</h4>
          <a
            href="https://diskominfo.tangerangkab.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            diskominfo.tangerangkab.go.id
          </a>

          <h4>{language === "ID" ? "Unduh Tangerang Gemilang" : "Download Tangerang Gemilang"}</h4>
          <div className="store-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=go.id.tangerangkab.gemilang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={googlePlayImg}
                alt={language === "ID" ? "Download di Google Play" : "Get it on Google Play"}
              />
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={appStoreImg}
                alt={language === "ID" ? "Download di App Store" : "Download on App Store"}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

