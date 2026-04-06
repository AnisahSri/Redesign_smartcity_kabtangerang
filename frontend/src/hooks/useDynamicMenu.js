import { useState, useEffect } from 'react';
import fetchMenuFromCMS from '../data/menuConfig';

export const useDynamicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const data = await fetchMenuFromCMS();
        // Karena API dummy salah format, force fallback sementara
        // Nanti sesuaikan dengan real CMS response structure
        setMenuItems(data || []);
      } catch (err) {
        setError(err.message);
        setMenuItems([]); // Akan trigger fallback di Header
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  return { menuItems, loading, error };
};
