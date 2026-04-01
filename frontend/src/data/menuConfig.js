import { STATIC_MENU_FALLBACK } from './staticMenuFallback';

// Fetch menu dari API dummy (nanti ganti ke CMS real)
export const fetchMenuFromCMS = async () => {
  try {
    const response = await fetch('https://mocki.io/v1/e8a995c3-3bd7-4541-9fc9-af15a020eda2');
    if (!response.ok) throw new Error('API failed');
    const menuData = await response.json();
    console.log('Menu dari API:', menuData);
    return menuData;
  } catch (error) {
    console.error('API Error, using fallback:', error);
    return STATIC_MENU_FALLBACK;
  }
};

// Export untuk manual testing
export default fetchMenuFromCMS;

