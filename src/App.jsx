import React, { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import RecipeDetailView from "./components/RecipeDetailView";
import SearchView from "./components/SearchView";
import HomeView from "./components/HomeView";
import MyFavorites from "./components/MyFavorites";
import Footer from "./components/Footer";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

const App = () => {
  const { isAuthenticated } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filterRecipe = useCallback(async (query, filterType) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const url = `${API_URL}filter.php?${filterType}=${query}`;
      console.log("filterRecipe: fetching", url);
      let res = await fetch(url);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      let result = await res.json();

      // if area filter returned empty, try common fallback variants (helps when API uses slightly different names)
      if (filterType === "a" && !result?.meals) {
        const areaFallbacks = {
          Indian: ["India"],
        };
        const fallbacks = areaFallbacks[query];
        if (fallbacks && fallbacks.length) {
          for (const alt of fallbacks) {
            const altUrl = `${API_URL}filter.php?${filterType}=${alt}`;
            console.log("filterRecipe: trying fallback", altUrl);
            res = await fetch(altUrl);
            if (!res.ok) continue;
            result = await res.json();
            if (result?.meals) break;
          }
        }
      }

      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // filter by category
  const filterByCategory = useCallback(
    (category) => {
      filterRecipe(category, "c");
    },
    [filterRecipe],
  );

  // filter by area
  const filterByArea = useCallback(
    (area) => {
      filterRecipe(area, "a");
    },
    [filterRecipe],
  );

  const handleSearch = useCallback(async (query) => {
    setSearchResult([]);
    setSearchLoading(true);

    try {
      const res = await fetch(`${API_URL}search.php?s=${query}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const result = await res.json();
      setSearchResult(result?.meals || []);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-950 font-sans text-gray-100 flex flex-col">
          <Navbar handleSearch={handleSearch} />
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <HomeView
                    filterByCategory={filterByCategory}
                    filterByArea={filterByArea}
                  />
                }
              />
              <Route path="/recipe/:id" element={<RecipeDetailView />} />
              <Route
                path="/favorites"
                element={
                  isAuthenticated ? (
                    <MyFavorites />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/search/:query"
                element={
                  <SearchView meals={searchResult} loading={searchLoading} />
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
