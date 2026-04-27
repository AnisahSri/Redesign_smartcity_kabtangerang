import React, { useState, useEffect } from 'react';
import '../styles/pages/agenda_page.css';

import { apiEndpoints } from '../utils/helpers';

const Agenda = () => {


    const [pageTitle, setPageTitle] = useState('');
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState({});

    useEffect(() => {
        const loadAgendas = async () => {
            try {
                // 1. Ambil daftar semua agenda menggunakan helpers apiEndpoints
                const response = await apiEndpoints.agenda.getAll();
                const responseData = response.data;
                const rawData = responseData.data?.data || responseData.data || [];
                
                // 2. Karena image harus dirender dan S3 url berbentuk JSON lewat endpoint getfile,
                // kita perlu mengambil S3 URL untuk tiap agenda secara concurrent
                const agendasWithUrls = await Promise.all(
                    rawData.map(async (agenda) => {
                        let imageUrl = agenda.imageName; // fallback awal
                        
                        try {
                            if (agenda.id) {
                                const fileRes = await apiEndpoints.agenda.getfile(agenda.id);
                                const s3Url = fileRes.data?.data?.url;
                                if (s3Url) {
                                    imageUrl = s3Url;
                                }
                            }
                        } catch (err) {
                            console.error(`Gagal mendapatkan url gambar untuk agenda ${agenda.id}:`, err);
                        }
                        
                        return {
                            ...agenda,
                            imageUrl: imageUrl,
                            imageName: imageUrl // menimpa nama lama dengan s3 url agar src berjalan lancar
                        };
                    })
                );

                console.log('Processed agendas:', agendasWithUrls);

                setPageTitle("City of Event: Kalender Acara Kabupaten Tangerang");
                
                setAgendas(Array.isArray(agendasWithUrls) ? agendasWithUrls : []);
            } catch (err) {
                setError('Failed to load agendas');
                console.error('Error fetching agendas:', err);
                setAgendas([]);
                setPageTitle("City of Event: Kalender Acara Kabupaten Tangerang");
            } finally {
                setLoading(false);
            }
        };

        loadAgendas();
    }, []);

    const openPreview = (imageUrl) => {
        setPreviewImage(imageUrl);
        document.body.style.overflow = 'hidden';
    };

    const closePreview = () => {
        setPreviewImage(null);
        document.body.style.overflow = 'auto';
    };

    const handleImageLoad = (agendaId) => {
        setImageLoaded(prev => ({ ...prev, [agendaId]: true }));
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePreview();
            }
        };

        if (previewImage) {
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [previewImage]);

    if (loading) {
        return (
            <div className="event-page">
                <section className="event-hero-section image-background">
                    <div className="hero-content">
                        <h1>{pageTitle || "City of Event: Kalender Acara Kabupaten Tangerang"}</h1>
                    </div>
                </section>

                <section className="event-calendar-container">
                    <div className="loading-placeholder">
                        <div className="spinner"></div>
                        <p>Memuat Agenda...</p>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="event-page">
                <section className="event-hero-section image-background">
                    <div className="hero-content">
                        <h1>{pageTitle || "City of Event: Kalender Acara Kabupaten Tangerang"}</h1>
                    </div>
                </section>

                <section className="event-calendar-container">
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="event-page">
            <section className="event-hero-section image-background">
                <div className="hero-content">
                    <h1>{pageTitle || "City of Event: Kalender Acara Kabupaten Tangerang"}</h1>
                </div>
            </section>

            <section className="event-calendar-container">

                {agendas.length === 0 ? (
                    <div className="no-events">
                        <p>Tidak ada agenda yang tersedia saat ini</p>
                    </div>
                ) : (
                    <div className="events-list">
                        {agendas.map((agenda) => (
                            <div key={agenda.id} className="calendar-wrapper">
                                <div className="agenda-info">
                                    {agenda.title && <h3 className="agenda-title">{agenda.title}</h3>}
                                    {agenda.year && <span className="agenda-year">{agenda.year}</span>}
                                </div>
                                {agenda.imageName && (
                                    <>
                                        {!imageLoaded[agenda.id] && (
                                            <div className="loading-placeholder">
                                                <div className="spinner"></div>
                                                <p>Memuat gambar...</p>
                                            </div>
                                        )}

                                        <img
                                            src={agenda.imageName}
                                            alt={`${agenda.title || ''} ${agenda.year || ''}`}
                                            className={`calendar-image ${imageLoaded[agenda.id] ? 'loaded' : ''}`}
                                            loading="lazy"
                                            onClick={() => openPreview(agenda.imageName)}
                                            onLoad={() => handleImageLoad(agenda.id)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {previewImage && (
                <div 
                    className="image-preview-modal active" 
                    onClick={closePreview}
                >
                    <div className="preview-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="close-preview"
                            onClick={closePreview}
                            aria-label="Close preview"
                        >
                            x
                        </button>

                        <img
                            src={previewImage}
                            alt="Preview Kalender"
                            className="preview-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agenda;