import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  X,
} from "lucide-react";
import "../styles/pages/kontak_page.css";

/* ========================================
   UTILITAS: Validasi Sederhana (Zod-like)
======================================== */
const validateForm = (data) => {
  const errors = {};

  if (!data.nama || data.nama.trim().length < 2) {
    errors.nama = "Nama lengkap minimal 2 karakter.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = "Masukkan alamat email yang valid.";
  }

  if (!data.subjek || data.subjek.trim().length < 3) {
    errors.subjek = "Subjek minimal 3 karakter.";
  }

  if (!data.pesan || data.pesan.trim().length < 10) {
    errors.pesan = "Pesan minimal 10 karakter.";
  }

  return errors;
};

/* ========================================
   UTILITAS: Generate Kode Captcha
======================================== */
const AMBIGUOUS_CHARS = new Set(["O", "0", "I", "1"]);
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCaptchaCode = () => {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  }
  return code;
};

/* ========================================
   KOMPONEN: Toast Notification
======================================== */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="kontak-toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`kontak-toast toast-${toast.type} ${toast.exiting ? "kontak-toast-exit" : ""}`}
        >
          <div className="kontak-toast-icon">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
          </div>
          <span className="kontak-toast-text">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};

/* ========================================
   KOMPONEN: Captcha Dialog
======================================== */
const CaptchaDialog = ({ onVerified, onClose }) => {
  const [code, setCode] = useState(generateCaptchaCode());
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input saat dialog terbuka
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const refreshCode = () => {
    setIsSpinning(true);
    setCode(generateCaptchaCode());
    setInput("");
    setError("");
    setTimeout(() => setIsSpinning(false), 500);
  };

  const handleVerify = () => {
    if (input.toUpperCase() === code) {
      onVerified();
    } else {
      setError("Kode tidak sesuai. Silakan coba lagi.");
      setCode(generateCaptchaCode());
      setInput("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="kontak-captcha-overlay" onClick={onClose}>
      <div
        className="kontak-captcha-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="kontak-captcha-close" onClick={onClose}>
          <X size={18} />
        </button>

        <div className="kontak-captcha-header">
          <h3>Verifikasi SmartCAPTCHA</h3>
          <p>Masukkan kode yang terlihat di bawah ini</p>
        </div>

        <div className="kontak-captcha-code-box">
          <span className="kontak-captcha-code">{code}</span>
        </div>

        <div className="kontak-captcha-actions">
          <input
            ref={inputRef}
            className={`kontak-captcha-input ${error ? "captcha-error" : ""}`}
            type="text"
            maxLength={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toUpperCase());
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder="______"
            autoComplete="off"
          />
          <button
            className={`kontak-captcha-refresh ${isSpinning ? "spinning" : ""}`}
            onClick={refreshCode}
            title="Ganti kode"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <button className="kontak-captcha-verify-btn" onClick={handleVerify}>
          Verifikasi
        </button>

        {error && <p className="kontak-captcha-error-msg">{error}</p>}
      </div>
    </div>
  );
};

/* ========================================
   HALAMAN UTAMA: Kontak
======================================== */
export default function Kontak() {
  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    subjek: "",
    pesan: "",
  });
  const [errors, setErrors] = useState({});
  const [robotStatus, setRobotStatus] = useState("idle"); // idle | verified
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState([]);

  // SEO - Set document title & meta
  useEffect(() => {
    document.title = "Kontak - Tangerang Smart City";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Hubungi kami untuk informasi lebih lanjut mengenai Tangerang Smart City. Kirim pesan, pertanyaan, atau saran Anda melalui formulir kontak kami."
      );
    }
    return () => {
      document.title = "SmartCity Kabupaten Tangerang";
    };
  }, []);

  // Toast helper
  const showToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message, exiting: false }]);
    // Auto remove after 3.5s
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 3500);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error saat user mengetik
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  // Handle robot checkbox click
  const handleRobotClick = () => {
    if (robotStatus === "verified") return;

    // Pre-check: Validasi form dulu
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("error", "Lengkapi semua kolom terlebih dahulu");
      return;
    }

    setShowCaptcha(true);
  };

  // Handle captcha verified
  const handleCaptchaVerified = () => {
    setShowCaptcha(false);
    setRobotStatus("verified");
    showToast("success", "Verifikasi berhasil! Anda bisa mengirim pesan.");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (robotStatus !== "verified") return;

    // Validasi ulang
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setRobotStatus("idle");
      showToast("error", "Lengkapi semua kolom terlebih dahulu");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mengambil URL Formspree dari file .env
      const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_URL;
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.nama,
          email: formData.email,
          subject: formData.subjek,
          message: formData.pesan
        })
      });

      if (response.ok) {
        showToast("success", "Pesan Anda berhasil dikirim! Terima kasih.");
        // Reset form
        setFormData({ nama: "", email: "", subjek: "", pesan: "" });
        setErrors({});
        setRobotStatus("idle");
      } else {
        showToast("error", "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      showToast("error", "Terjadi kesalahan jaringan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Info cards data
  const infoCards = [
    {
      icon: <MapPin size={24} />,
      title: "Alamat",
      desc: "Jl. H. Somawinata No.1, Gedung Smart Building Puspemkab Tangerang, Kec. Tigaraksa, Kabupaten Tangerang, Banten 15720, Indonesia",
    },
    {
      icon: <Phone size={24} />,
      title: "Telepon",
      desc: "(021) 5991-2843",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      desc: "helpdesk@tangerangkab.go.id",
    },
  ];

  return (
    <main className="kontak-main">
      {/* TOAST */}
      <ToastContainer toasts={toasts} />

      {/* HERO */}
      <section className="kontak-hero">
        <div className="kontak-hero-badge">
          <Mail size={16} />
          Hubungi Kami
        </div>
        <h1>Kami Siap Mendengar Anda</h1>
        <p>
          Sampaikan pertanyaan, saran, atau masukan Anda untuk kemajuan
          Tangerang Smart City
        </p>
      </section>

      {/* CONTENT */}
      <div className="kontak-content">
        <div className="kontak-grid">
          {/* LEFT: Info Cards */}
          <div className="kontak-info-cards">
            {infoCards.map((card, i) => (
              <div className="kontak-info-card" key={i}>
                <div className="kontak-info-icon">{card.icon}</div>
                <div className="kontak-info-content">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Form Card */}
          <div className="kontak-form-card">
            <div className="kontak-form-header">
              <h2>Kirim Pesan</h2>
              <p>Isi formulir di bawah ini dan kami akan segera merespons</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Nama Lengkap */}
              <div className="kontak-form-group">
                <label htmlFor="kontak-nama">
                  Nama Lengkap <span className="required-star">*</span>
                </label>
                <input
                  id="kontak-nama"
                  className={`kontak-input ${errors.nama ? "error" : ""}`}
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda"
                  autoComplete="name"
                />
                {errors.nama && (
                  <div className="kontak-field-error">
                    <AlertCircle size={14} />
                    {errors.nama}
                  </div>
                )}
              </div>

              {/* Alamat Email */}
              <div className="kontak-form-group">
                <label htmlFor="kontak-email">
                  Alamat Email <span className="required-star">*</span>
                </label>
                <input
                  id="kontak-email"
                  className={`kontak-input ${errors.email ? "error" : ""}`}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contoh@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="kontak-field-error">
                    <AlertCircle size={14} />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Subjek */}
              <div className="kontak-form-group">
                <label htmlFor="kontak-subjek">
                  Subjek <span className="required-star">*</span>
                </label>
                <input
                  id="kontak-subjek"
                  className={`kontak-input ${errors.subjek ? "error" : ""}`}
                  type="text"
                  name="subjek"
                  value={formData.subjek}
                  onChange={handleChange}
                  placeholder="Topik pesan Anda"
                  autoComplete="off"
                />
                {errors.subjek && (
                  <div className="kontak-field-error">
                    <AlertCircle size={14} />
                    {errors.subjek}
                  </div>
                )}
              </div>

              {/* Pesan */}
              <div className="kontak-form-group">
                <label htmlFor="kontak-pesan">
                  Pesan <span className="required-star">*</span>
                </label>
                <textarea
                  id="kontak-pesan"
                  className={`kontak-input ${errors.pesan ? "error" : ""}`}
                  name="pesan"
                  rows={6}
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tulis pesan Anda di sini..."
                />
                {errors.pesan && (
                  <div className="kontak-field-error">
                    <AlertCircle size={14} />
                    {errors.pesan}
                  </div>
                )}
              </div>

              {/* Robot Checkbox */}
              <div className="kontak-robot-section">
                <div
                  className={`kontak-robot-box ${robotStatus === "verified" ? "verified" : ""}`}
                  onClick={handleRobotClick}
                >
                  <div className="kontak-robot-left">
                    <div className="kontak-robot-checkbox">
                      {robotStatus === "verified" && (
                        <CheckCircle2 size={20} color="white" />
                      )}
                    </div>
                    <span className="kontak-robot-label">
                      {robotStatus === "verified"
                        ? "Terverifikasi"
                        : "Saya bukan robot"}
                    </span>
                  </div>
                  <div className="kontak-robot-brand">
                    <span className="kontak-robot-brand-name">
                      SmartCAPTCHA
                    </span>
                    <ShieldCheck
                      size={16}
                      className="kontak-robot-brand-icon"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="kontak-submit-btn"
                disabled={robotStatus !== "verified" || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="kontak-spinner" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CAPTCHA DIALOG */}
      {showCaptcha && (
        <CaptchaDialog
          onVerified={handleCaptchaVerified}
          onClose={() => setShowCaptcha(false)}
        />
      )}
    </main>
  );
}
