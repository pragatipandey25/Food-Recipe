const RECENT_KEY = "recentlyViewed";
const TASTE_KEY = "tastePrefs";
const COMMUNITY_KEY = "communityFavorites";

export const addRecentViewed = (meal) => {
  if (!meal || !meal.idMeal) return;
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    // remove existing
    const filtered = list.filter((m) => m.idMeal !== meal.idMeal);
    filtered.unshift({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    });
    // keep max 12
    const trimmed = filtered.slice(0, 12);
    localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error(e);
  }
};

export const getRecentlyViewed = () => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const getTastePrefs = () => {
  try {
    const raw = localStorage.getItem(TASTE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const setTastePrefs = (prefs) => {
  try {
    localStorage.setItem(TASTE_KEY, JSON.stringify(prefs || []));
  } catch (e) {}
};

export const getCommunityFavorites = () => {
  try {
    const raw = localStorage.getItem(COMMUNITY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const setCommunityFavorites = (list) => {
  try {
    localStorage.setItem(COMMUNITY_KEY, JSON.stringify(list || []));
  } catch (e) {}
};

export const clearRecentlyViewed = () => {
  try {
    localStorage.removeItem(RECENT_KEY);
  } catch (e) {}
};

export default {};
