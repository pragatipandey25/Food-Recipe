import React from "react";
import { Link } from "react-router-dom";
import { getRecentlyViewed } from "../utils/store";

const RecentlyViewed = () => {
  const list = getRecentlyViewed();
  if (!list || list.length === 0)
    return (
      <section className="p-4">
        <h3 className="text-2xl font-semibold mb-2">Recently Viewed</h3>
        <p className="text-muted">You haven't viewed any recipes yet.</p>
      </section>
    );

  return (
    <section className="p-4">
      <h3 className="text-2xl font-semibold mb-4">Recently Viewed</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {list.map((meal) => (
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

export default RecentlyViewed;
