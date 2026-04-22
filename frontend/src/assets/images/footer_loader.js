// Footer Loader Script - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
});

function loadFooter() {
    // Cari elemen footer placeholder atau footer yang sudah ada
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const existingFooter = document.querySelector('.main-footer, .site-footer');
    
    // Enhanced fallback footer dengan styling yang konsisten
    const createFallbackFooter = () => {
        return `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="footer-section about">
                        <div class="logo-smartcity">SmartCity Kab. Tangerang</div>
                        <p>Mewujudkan Kabupaten Tangerang sebagai kota pintar yang terintegrasi dan berkelanjutan melalui teknologi informasi dan komunikasi.</p>
                    </div>
                    
                    <div class="footer-section links">
                        <h3>Tautan Cepat</h3>
                        <ul>
                            <li><a href="/" aria-label="Halaman Beranda">Beranda</a></li>
                            <li><a href="/profile_page.html" aria-label="Halaman Profile">Tentang</a></li>
                            <li><a href="/dimensi_page.html" aria-label="Halaman Dimensi">Dimensi</a></li>
                            <li><a href="/persona_page.html" aria-label="Halaman Tim">Tim</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-section social">
                        <h3>Ikuti Kami</h3>
                        <div class="social-icons">
                            <a href="https://instagram.com/tangerangkab" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="Instagram Kabupaten Tangerang">
                                Instagram
                            </a>
                            
                            <a href="https://tiktok.com/@tangerangkab" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="TikTok Kabupaten Tangerang">
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} SmartCity Kabupaten Tangerang. Hak Cipta Dilindungi Undang-Undang.</p>
                </div>
            </footer>
        `;
    };

    // Function to handle footer loading with error handling
    const loadFooterFromFile = (targetElement, isPlaceholder = true) => {
        const footerUrls = [
            'footer.html',
            'html/footer.html',
            './footer.html',
            '../footer.html'
        ];

        let attemptCount = 0;
        
        const tryLoadFooter = () => {
            if (attemptCount >= footerUrls.length) {
                console.warn('All footer URLs failed, using fallback');
                if (isPlaceholder) {
                    targetElement.innerHTML = createFallbackFooter();
                } else {
                    targetElement.outerHTML = createFallbackFooter();
                }
                initializeFooterFeatures();
                return;
            }

            const currentUrl = footerUrls[attemptCount];
            attemptCount++;

            fetch(currentUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    if (data.trim() === '') {
                        throw new Error('Empty footer content');
                    }
                    
                    if (isPlaceholder) {
                        targetElement.innerHTML = data;
                    } else {
                        targetElement.outerHTML = data;
                    }
                    
                    console.log(`Footer loaded successfully from: ${currentUrl}`);
                    initializeFooterFeatures();
                })
                .catch(error => {
                    console.warn(`Failed to load footer from ${currentUrl}:`, error.message);
                    
                    // Try next URL or fallback
                    setTimeout(tryLoadFooter, 100);
                });
        };

        tryLoadFooter();
    };

    // Initialize footer features after loading
    const initializeFooterFeatures = () => {
        // Add loading animation fade-in
        const footerElement = document.querySelector('.site-footer, .main-footer');
        if (footerElement) {
            footerElement.style.opacity = '0';
            footerElement.style.transform = 'translateY(20px)';
            footerElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                footerElement.style.opacity = '1';
                footerElement.style.transform = 'translateY(0)';
            }, 100);
        }

        // Enhanced social links with analytics tracking
        const socialLinks = document.querySelectorAll('.social-icons a');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const platform = this.textContent.trim();
                console.log(`Social link clicked: ${platform}`);
                
                // Add tracking if analytics is available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'Social Media',
                        event_label: platform,
                        transport_type: 'beacon'
                    });
                }
            });

            // Add hover effects for better UX
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Add footer links navigation enhancement
        const footerLinks = document.querySelectorAll('.footer-section.links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Handle internal links with smooth scroll for same page
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else if (href.startsWith('/') && window.location.pathname === href) {
                    // If clicking current page, scroll to top
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add responsive behavior for mobile
        const handleResize = () => {
            const footerSections = document.querySelectorAll('.footer-section');
            const isMobile = window.innerWidth <= 768;
            
            footerSections.forEach(section => {
                if (isMobile) {
                    section.style.textAlign = 'center';
                    section.style.marginBottom = '2rem';
                } else {
                    section.style.textAlign = 'left';
                    section.style.marginBottom = '1rem';
                }
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Add keyboard navigation support
        const focusableElements = document.querySelectorAll('.site-footer a, .site-footer button');
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.tagName.toLowerCase() === 'a') {
                    this.click();
                }
            });
        });

        console.log('Footer features initialized successfully');
    };

    // Main loading logic
    try {
        if (footerPlaceholder) {
            console.log('Loading footer into placeholder');
            loadFooterFromFile(footerPlaceholder, true);
        } else if (existingFooter) {
            console.log('Replacing existing footer');
            loadFooterFromFile(existingFooter, false);
        } else {
            console.log('No footer container found, appending to body');
            // Create a temporary container
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = createFallbackFooter();
            document.body.appendChild(tempDiv.firstElementChild);
            initializeFooterFeatures();
        }
    } catch (error) {
        console.error('Critical error in footer loader:', error);
        
        // Emergency fallback
        const emergencyFooter = document.createElement('footer');
        emergencyFooter.className = 'site-footer';
        emergencyFooter.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #400d31; color: white;">
                <p>&copy; ${new Date().getFullYear()} SmartCity Kabupaten Tangerang</p>
            </div>
        `;
        document.body.appendChild(emergencyFooter);
    }
}

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadFooter };
}