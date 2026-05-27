import React from "react";
import { getTastePrefs } from "../utils/store";
import { useFetch, API_URL } from "./useFetch";
import { Link } from "react-router-dom";

const BasedOnTaste = () => {
  const prefs = getTastePrefs();
  const pref = prefs && prefs.length ? prefs[0] : null;

  const { data, loading } = useFetch(
    pref ? `${API_URL}filter.php?c=${pref}` : null,
  );
  const meals = data?.meals || [];

  if (!pref)
    return (
      <section className="p-4">
        <h3 className="text-2xl font-semibold mb-2">Based on Your Taste</h3>
        <p className="text-muted">
          Set your taste preferences to get personalized suggestions.
        </p>
      </section>
    );

  return (
    <section className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Based on Your Taste</h3>
      {loading && <p className="text-muted">Loading recommendations...</p>}
      {!loading && meals.length === 0 && (
        <p className="text-muted">No recommendations available for {pref}.</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {meals.slice(0, 8).map((meal) => (
          <Link
            key={meal.idMeal}
            to={`/recipe/${meal.idMeal}`}
            className="card p-3 rounded-md flex flex-col items-center text-center"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-24 h-24 rounded-md object-cover mb-2"
            />
            <div className="text-sm font-semibold">{meal.strMeal}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BasedOnTaste;
