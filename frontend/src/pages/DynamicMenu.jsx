import React, { useState, useEffect } from "react";
import { apiEndpoints } from "../utils/helpers.js";
import { useLanguage } from "../utils/LanguageContext";

const DynamicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await apiEndpoints.menu.getAll();
        if (!response.ok) throw new Error('Menu API failed');
        const data = await response.json();
        setMenuItems(data); // Direct array from mocki API
      } catch (err) {
        console.error('Dynamic Menu API Error:', err);
        setLoading(false);
        // Fallback static menu
        setMenuItems([
          { title: "Dashboard", link: "/" },
          { title: "Dimensi", link: "/dimensi" },
          { title: "Agenda", link: "/agenda" },
          { title: "Publikasi", link: "/publikasi" },
          { title: "Profile", link: "/profile" }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) return <div className="loading-menu">Loading menu...</div>;

  return (
    <nav className="dynamic-menu">
      <ul>
        {menuItems.map((item, index) => (
          <li key={item.id || index}>
            <a href={item.link || item.path || '#'}>
              {item.title || item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DynamicMenu;

