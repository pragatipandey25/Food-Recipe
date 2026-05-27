import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { getCommunityFavorites, setCommunityFavorites } from "../utils/store";
import { useAuth } from "../AuthContext";

const MyFavorites = () => {
  const { isAuthenticated, openAuth } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getCommunityFavorites() || []);
  }, []);

  if (!isAuthenticated) {
    return (
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-4">My Favorites</h2>
        <p className="text-muted mb-4">Please login to view your favorites.</p>
        <div className="flex gap-3">
          <button className="btn btn-primary" onClick={() => openAuth("login")}>
            Login
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => openAuth("signup")}
          >
            Sign up
          </button>
        </div>
      </main>
    );
  }

  const remove = (id) => {
    const next = (list || []).filter((m) => m.idMeal !== id);
    setCommunityFavorites(next);
    setList(next);
  };

  if (!list || list.length === 0)
    return (
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-4">My Favorites</h2>
        <p className="text-muted">You have no saved recipes yet.</p>
      </main>
    );

  return (
    <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6">My Favorites</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {list.map((meal) => (
          <div key={meal.idMeal} className="relative">
            <Link to={`/recipe/${meal.idMeal}`}>
              <RecipeCard meal={meal} compact={false} />
            </Link>
            <button
              onClick={() => remove(meal.idMeal)}
              className="absolute top-3 right-3 btn btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyFavorites;
