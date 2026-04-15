import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileText } from 'lucide-react';

import { useLanguage } from '../utils/LanguageContext';
import { apiEndpoints, getPublikasiBaseUrl } from '../utils/helpers';
import '../styles/pages/publication_page.css';

export default function Publikasi() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [publikasiData, setPublikasiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublikasi();
  }, []);

  const fetchFile = async (id) => {
    try {
      const response = await apiEndpoints.publications.getfile(id);
      // Axios menaruh respon ke dalam 'data'. Karena JSON response backend juga memiliki root 'data',
      // maka jalurnya menjadi response.data.data.url
      const url = response.data?.data?.url; 
      
      // Buka url langsung
      if (url) {
        handleReview(url);
      } else {
        console.error("URL tidak ditemukan di dalam respon");
      }
    } catch (err) {
      setError('Failed to load file');
      console.error('Error fetching file:', err);
    }
  };

  const fetchPublikasi = async () => {
    try {
      const response = await apiEndpoints.publications.getAll();
      const responseData = response.data;
      const data = responseData.data?.data || responseData.data || [];
      const baseUrl = getPublikasiBaseUrl();

      const mappedData = data.map(item => ({
        id: item.id,
        title: item.title || item.name || 'Untitled',
        description: language === "ID" ? "LIHAT PDF" : "VIEW PDF",
        date: item.year || item.created_at?.slice(0, 4) || 'N/A',
        fileUrl: `${baseUrl}/api/v1/publikasi/${item.id}/file`

      }));
      console.log(mappedData);
      setPublikasiData(mappedData);
    } catch (err) {
      setError('Failed to load publications');
      console.error('Error fetching publications:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPublikasi = publikasiData.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReview = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="publikasi-container">
      <section className="publikasi-hero">
        <div className="publikasi-hero-content">
          <h1 className="publikasi-hero-title">
            {language === "ID" ? "Publikasi SmartCity" : "SmartCity Publications"}
          </h1>
        </div>
      </section>

      <section className="publikasi-main">
        <div className="publikasi-content-wrapper">
          <div className="publikasi-document-card">
            <div className="publikasi-document-header">
              <h2 className="publikasi-document-title">
                {language === "ID" ? "Daftar Dokumen" : "Document List"}
              </h2>
              <div className="publikasi-search-box">
                <Search className="publikasi-search-icon" size={18} />
                <input
                  type="text"
                  placeholder={language === "ID" ? "Cari" : "Search"}
                  className="publikasi-search-input"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="publikasi-table-container">
              <table className="publikasi-table">
                <thead>
                  <tr>
                    <th>{language === "ID" ? "Judul" : "Title"}</th>
                    <th>{language === "ID" ? "Deskripsi" : "Description"}</th>
                    <th>{language === "ID" ? "Tanggal" : "Date"}</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="publikasi-empty-row">
                        {language === "ID" ? "Memuat data..." : "Loading data..."}
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3" className="publikasi-empty-row">
                        {error}
                      </td>
                    </tr>
                  ) : filteredPublikasi.length > 0 ? (
                    filteredPublikasi.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="publikasi-title-cell">
                            <FileText className="publikasi-file-icon" size={18} />
                            <span
                              className="publikasi-title-link"
                              onClick={() => handleReview(item.fileUrl)}
                              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                            >
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td>
                          <button
                            className="publikasi-download-btn"
                            onClick={() => fetchFile(item.id)}
                            disabled={!item.fileUrl}
                          >
                            {item.description}
                          </button>
                        </td>
                        <td>
                          <div className="publikasi-date-cell">
                            <Calendar className="publikasi-calendar-icon" size={14} />
                            <span>{item.date}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="publikasi-empty-row">
                        {language === "ID" ? "Tidak ada dokumen yang sesuai dengan pencarian Anda." : "No documents match your search."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

