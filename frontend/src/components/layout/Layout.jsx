// src/components/Layout.jsx

import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx"; 
import Footer from "./Footer.jsx";

// Impor komponen modular
import ErrorBoundary from "../common/ErrorBoundary.jsx";
import BackToTopButton from "../common/BackToTopButton.jsx";
import PageLoader from "../common/PageLoader.jsx";

// Import CSS Layout
import "../../styles/base/layout.css";

export default function Layout() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);
  const location = useLocation();

  // Handle route changes
  useEffect(() => {
    setPageTransition(true);
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setPageTransition(false);
    }, 50);

    return () => clearTimeout(timer);
  }, [location]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ErrorBoundary>
      <div className={`app-shell ${pageTransition ? 'page-transitioning' : ''}`}>

        <Header />
        
        <main 
          id="main-content" 
          className={`main-content ${isLoading ? 'loading' : ''}`} 
          role="main"
        >
          <Outlet /> 
          {isLoading && <PageLoader />}
        </main>
        
        <Footer />
        
        <BackToTopButton />
        
      </div>
    </ErrorBoundary>
  );
}

