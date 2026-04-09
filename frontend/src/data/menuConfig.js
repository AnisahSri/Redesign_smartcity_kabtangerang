import { STATIC_MENU_FALLBACK } from './staticMenuFallback';
import { apiEndpoints } from '../utils/helpers';

// Fetch menu dari API CMS
export const fetchMenuFromCMS = async () => {
  try {
    const response = await apiEndpoints.menu.getAll();
    // Menyesuaikan dengan format bungkus "data" dari Axios
    const menuData = response.data?.data || response.data;
    console.log('Menu dari API:', menuData);
    return menuData;
  } catch (error) {
    console.error('API Error, using fallback:', error);
    return STATIC_MENU_FALLBACK;
  }
};

// Export untuk manual testing
export default fetchMenuFromCMS;

