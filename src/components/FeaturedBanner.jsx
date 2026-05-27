import React from "react";
import { useNavigate } from "react-router-dom";

const FeaturedBanner = ({ filterByCategory }) => {
  const navigate = useNavigate();

  const go = (cat) => {
    if (filterByCategory) filterByCategory(cat);
    navigate(`/search/${cat}`);
  };

  return (
    <section className="rounded-lg overflow-hidden bg-linear-to-r from-blue-600 to-cyan-500 text-white p-8 shadow-lg">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Discover Delicious Recipes</h1>
          <p className="mt-2 text-sm opacity-90">
            Explore trending dishes, quick meals, and staff picks curated just
            for you.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={() => go("Chicken")} className="btn btn-primary">
            Explore Chicken
          </button>
          <button
            onClick={() => go("Vegetarian")}
            className="btn btn-secondary"
          >
            Browse Veg
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
