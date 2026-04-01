import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/base/index.css';
import App from './App.jsx';
import { LanguageProvider } from './utils/LanguageContext.jsx';


// --- Performance monitoring dan error handling ---
const initializeApp = () => {
    // Ambil container root
    const container = document.getElementById('root');

    if (!container) {
        // Lemparkan error jika container tidak ada. Error ini akan ditangkap oleh init().
        throw new Error('Root container not found');
    }

    // Buat root hanya setelah container dipastikan ada
    const root = createRoot(container);
    
    // Performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
        try {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    // Log performance metrics
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') { 
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                        console.log('CLS:', entry.value);
                    }
                });
            });
            
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            observer.observe({ type: 'first-input', buffered: true });
            observer.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.log('Performance observer not supported');
        }
    }
    
    // Global error handler
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
        if (process.env.NODE_ENV === 'production') {
            // Log error ke layanan monitoring di produksi
        }
    });
    
    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
        if (process.env.NODE_ENV === 'production') {
            // Log rejection ke layanan monitoring di produksi
        }
    });
    
    // Initialize app with error boundary
    try {
        root.render(
            <StrictMode>
                <LanguageProvider>
                    <App />
                </LanguageProvider>
            </StrictMode>
        );

        // Hide preloader after React app is rendered
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }

    } catch (error) {
        console.error('Failed to render app:', error);
        // Catch rendering error di sini
    }
};

// SEO and meta tags setup
const setupSEO = () => {
    const defaultMetas = [
        { name: 'description', content: 'SmartCity Kabupaten Tangerang - Mewujudkan kota pintar yang terintegrasi dan berkelanjutan melalui teknologi informasi dan komunikasi.' },
        { name: 'keywords', content: 'smart city, kabupaten tangerang, teknologi, inovasi, pemerintahan digital, kota pintar' },
        { name: 'author', content: 'SmartCity Kabupaten Tangerang' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'theme-color', content: '#711c5c' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'SmartCity Kabupaten Tangerang' },
        { property: 'og:locale', content: 'id_ID' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@tangerangkab' }
    ];
    
    defaultMetas.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        const existing = document.querySelector(selector);
        
        if (!existing) {
            const meta = document.createElement('meta');
            if (name) meta.name = name;
            if (property) meta.property = property;
            meta.content = content;
            document.head.appendChild(meta);
        }
    });
    
    if (!document.title) {
        document.title = 'SmartCity Kabupaten Tangerang';
    }
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "GovernmentOrganization",
        "name": "SmartCity Kabupaten Tangerang",
        "description": "Inisiatif SmartCity Kabupaten Tangerang untuk mewujudkan kota pintar yang terintegrasi dan berkelanjutan",
        "url": window.location.origin,
        "areaServed": {
            "@type": "Place",
            "name": "Kabupaten Tangerang"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service"
        }
    };
    
    if (!document.querySelector('script[type="application/ld+json"]')) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }
};

// PWA setup
const setupPWA = () => {
    if (!document.querySelector('link[rel="manifest"]')) {
        const manifest = document.createElement('link');
        manifest.rel = 'manifest';
        manifest.href = '/manifest.json';
        document.head.appendChild(manifest);
    }
    
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
        const appleIcon = document.createElement('link');
        appleIcon.rel = 'apple-touch-icon';
        appleIcon.href = '/icon-192x192.png';
        document.head.appendChild(appleIcon);
    }
    
    // Logic untuk menyimpan deferredPrompt tetap ada, meskipun tidak dipicu di sini
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        e.preventDefault();
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        deferredPrompt = null;
    });
};


// --- Initiator Utama ---
const init = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
        return;
    }
    
    try {
        setupSEO();
        setupPWA();
        initializeApp(); // Panggil fungsi inisialisasi React
        
        console.log('SmartCity App initialized successfully');

    } catch (error) {
        console.error('Failed to initialize app:', error);
        
        // Fallback error display agar pengguna tahu ada masalah
        const root = document.getElementById('root'); 
        if (root) {
            root.innerHTML = `
                <div style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #e74c3c;
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                ">
                    <div>
                        <h1>Kesalahan Sistem</h1>
                        <p>Aplikasi tidak dapat dimuat. Silakan hubungi administrator atau coba lagi nanti.</p>
                        <button onclick="window.location.reload()" style="
                            background: white;
                            color: #e74c3c;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-top: 20px;
                        ">
                            Coba Lagi
                        </button>
                    </div>
                </div>
            `;
        }
    }
};

init();
