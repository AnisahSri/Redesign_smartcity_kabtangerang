import { STATIC_MENU_FALLBACK } from './staticMenuFallback';
import { apiEndpoints } from '../utils/helpers';

/**
 * Transform flat menu data dari API → nested format untuk Header.jsx
 * 
 * API return: flat array dengan parentId (Main/Sub)
 * Header butuh: nested array dengan children[]
 */
const transformMenuData = (flatMenus) => {
  // 1. Filter hanya yang visible
  const visibleMenus = flatMenus.filter(item => item.isVisible);

  // 2. Pisahkan Main menu dan Sub menu
  const mainMenus = visibleMenus.filter(item => item.type === 'Main');
  const subMenus = visibleMenus.filter(item => item.type === 'Sub');

  // 3. Bangun nested structure
  return mainMenus.map(main => {
    const children = subMenus
      .filter(sub => sub.parentId === main.id)
      .map(sub => ({
        titleID: sub.name,
        titleEN: sub.name,
        path: sub.externalLink || `/menu/${sub.id}`,
      }));

    const result = {
      titleID: main.name,
      titleEN: main.name,
      path: children.length > 0 ? '#' : (main.externalLink || `/menu/${main.id}`),
    };

    if (children.length > 0) {
      result.children = children;
    }

    return result;
  });
};

/**
 * Gabungkan menu statis (base) dengan menu dari API.
 * - Menu statis (Tentang, Dimensi, Agenda, dll) TETAP ada
 * - Menu dari API yang cocok (by titleID) akan di-update  
 * - Menu dari API yang baru akan ditambahkan di akhir
 */
const mergeMenus = (staticMenus, apiMenus) => {
  // Mulai dari copy menu statis sebagai base
  const merged = staticMenus.map(staticItem => {
    // Cari apakah ada item API yang namanya cocok
    const apiMatch = apiMenus.find(
      api => api.titleID.toLowerCase() === staticItem.titleID.toLowerCase()
    );

    if (apiMatch) {
      // Kalau cocok, gunakan data dari API (lebih update)
      return apiMatch;
    }

    // Kalau tidak cocok, tetap pakai menu statis
    return staticItem;
  });

  // Tambahkan menu API yang belum ada di statis
  apiMenus.forEach(apiItem => {
    const existsInStatic = staticMenus.some(
      s => s.titleID.toLowerCase() === apiItem.titleID.toLowerCase()
    );
    if (!existsInStatic) {
      merged.push(apiItem);
    }
  });

  return merged;
};

// Fetch menu dari real CMS API
export const fetchMenuFromCMS = async () => {
  try {
    const response = await apiEndpoints.menu.getAll();
    const rawMenus = response.data?.data?.data;

    if (!Array.isArray(rawMenus) || rawMenus.length === 0) {
      throw new Error('Invalid menu data from API');
    }

    const apiMenus = transformMenuData(rawMenus);
    // Gabungkan: menu statis tetap ada + menu API ditambahkan/di-update
    const merged = mergeMenus(STATIC_MENU_FALLBACK, apiMenus);
    console.log('Menu merged (static + API):', merged);
    return merged;
  } catch (error) {
    console.error('API Error, using fallback:', error);
    return STATIC_MENU_FALLBACK;
  }
};

// Export untuk manual testing
export default fetchMenuFromCMS;
