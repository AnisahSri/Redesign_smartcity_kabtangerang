import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { apiEndpoints } from "../utils/helpers.js";

import iconsDimensi from "../assets/icons/icondimensi.svg";
import backgroundDimensi from "../assets/images/background_dimensi.svg";

/* ====== ICON FITUR UNGGULAN ====== */
import smartGovernance from "../assets/icons/smartgovernance.svg";
import smartLiving from "../assets/icons/smartliving.svg";
import smartSociety from "../assets/icons/smartsociety.svg";
import smartEconomy from "../assets/icons/smarteconomy.svg";
import smartEnvironment from "../assets/icons/smartenvironment.svg";
import smartBranding from "../assets/icons/smartbranding.svg";

import "../styles/pages/dimension_page.css";

function Dimension() {
  const navigate = useNavigate();
  const location = useLocation();


  const [active, setActive] = useState(null);
  const [fiturDetail, setFiturDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const detailRef = useRef(null);

  useEffect(() => {
    const fetchDimensi = async () => {
      try {
        const response = await apiEndpoints.dimensi.getAll();
        const jsonData = response.data;
        const dimensiList = jsonData.data.data.map(item => ({
          title: item.name,
          desc: item.description,
          path: `/${item.name.replace(/ /g, '')}`
        }));
        setFiturDetail(dimensiList);
      } catch (err) {
        console.error('API Error:', err);
        setLoading(false);
        // Fallback static data
        setFiturDetail([
          { title: "Smart Governance", desc: "Fallback: Smart Governance adalah sistem tata kelola pemerintahan berbasis teknologi.", path: "/SmartGovernance" },
          { title: "Smart Living", desc: "Fallback: Smart Living meningkatkan kualitas hidup.", path: "/SmartLiving" },
          { title: "Smart Society", desc: "Fallback: Smart Society membangun masyarakat pintar.", path: "/SmartSociety" },
          { title: "Smart Economy", desc: "Fallback: Smart Economy untuk pertumbuhan ekonomi.", path: "/SmartEconomy" },
          { title: "Smart Environment", desc: "Fallback: Smart Environment berkelanjutan.", path: "/SmartEnvironment" },
          { title: "Smart Branding", desc: "Fallback: Smart Branding citra daerah.", path: "/SmartBranding" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDimensi();
  }, [location.key]);

  useEffect(() => {
    setActive(null);
    window.scrollTo(0, 0);
  }, [location.key]);

  const handleClick = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }

    setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 100);
  };

  return (
    <section id="dimensi" className="dimensi-section">

      <div className="dimensi-hero">
        <div className="hero-text">
          <h1>
            Dimensi Smart City
          </h1>
        </div>

        <img
          src={backgroundDimensi}
          alt="Dimensi Smart City"
          className="dimensi-center-image"
        />
      </div>

      <div className="dimensi-info">
        <div className="dimensi-info-container">

          <img
            src={iconsDimensi}
            alt="Icon Dimensi"
            className="dimensi-info-icon"
          />

          <div className="dimensi-info-text">
            <h2>
              Dimensi Smart City
            </h2>

            <p>
              Mendefinisikan pilar-pilar penting untuk mewujudkan Kabupaten Tangerang sebagai kota pintar yang terintegrasi dan berkelanjutan.
            </p>
          </div>

        </div>
      </div>

      <section className="fitur" ref={detailRef}>

        <h2>
          Dimensi Smartcity
        </h2>

        {loading ? (
          <div className="loading">Loading dimensi...</div>
        ) : (
          <div className="fitur-wrapper">
            {fiturDetail.map((detail, index) => {
              const icons = {
                'Smart Governance': smartGovernance,
                'Smart Living': smartLiving,
                'Smart Society': smartSociety,
                'Smart Economy': smartEconomy,
                'Smart Environment': smartEnvironment,
                'Smart Branding': smartBranding
              };
              const icon = icons[detail.title];
              return (
                <div
                  key={index}
                  className={`fitur-item ${active === index ? "active" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  <div className="dimensi-icon-circle">
                    <img src={icon} alt={detail.title} />
                  </div>
                  <p>{detail.title}</p>

                  {active === index && (
                    <div className="fitur-popup">

                      <div className="popup-arrow"></div>

                      <button
                        className="close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(null);
                        }}
                      >
                        ×
                      </button>

                      <h2>{detail.title}</h2>

                      <p>{detail.desc}</p>

                      <div className="popup-bottom">
                        <button
                          className="btn-kunjungan"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(detail.path);
                          }}
                        >
                          Kunjungi Halaman →
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
        <button
          className="btn-detail"
          onClick={() => {
            setActive(null);
            navigate("/dimensi");
          }}
        >
          Detail Dimensi →
        </button>

      </section>

    </section>
  );
}

export default Dimension;
