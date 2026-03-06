import React, { useState, useEffect } from 'react';
import '../styles/pages/agenda_page.css';
import { apiEndpoints } from '../utils/helpers';

const Agenda = () => {
    const [agendas, setAgendas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState({});

    useEffect(() => {
        const fetchAgendas = async () => {
            try {
                const response = await apiEndpoints.events.getAllPublic();
                setAgendas(response.data.data);
            } catch (err) {
                setError('Failed to load agendas');
                console.error('Error fetching agendas:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchAgendas();
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
                        <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
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
                        <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
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
                    <h1>City of Event: Kalender Acara Kabupaten Tangerang</h1>
                </div>
            </section>

            <section className="event-calendar-container">
                <h2 className="section-title">Kalender Resmi Acara Publik</h2>

                {agendas.length === 0 ? (
                    <div className="no-events">
                        <p>Tidak ada agenda yang tersedia saat ini</p>
                    </div>
                ) : (
                    <div className="events-list">
                        {agendas.map((agenda) => (
                            <div key={agenda.id} className="calendar-wrapper">
                                {agenda.imageUrl && (
                                    <>
                                        {!imageLoaded[agenda.id] && (
                                            <div className="loading-placeholder">
                                                <div className="spinner"></div>
                                                <p>Memuat gambar...</p>
                                            </div>
                                        )}

                                        <img
                                            src={agenda.imageUrl}
                                            alt={`Kalender Agenda ${agenda.year || ''}`}
                                            className={`calendar-image ${imageLoaded[agenda.id] ? 'loaded' : ''}`}
                                            loading="lazy"
                                            onClick={() => openPreview(agenda.imageUrl)}
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