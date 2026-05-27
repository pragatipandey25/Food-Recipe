import React from "react";

import { Globe } from "lucide-react";

import { Link } from "react-router-dom";

const Cuisine = ({ filterByArea }) => {
  const featuredAreas = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Indian",
    "Italian",
    "Mexican",
    "Russian",
    "Thai",
  ];

  return (
    <section className="mt-6">
      <div className="px-4 mb-3">
        <h2 className="text-2xl font-extrabold mb-1 tracking-tight border-l-4 border-primary pl-4 flex items-center gap-3">
          <Globe className="w-5 h-5 text-accent mr-2" />
          Global Cuisines
        </h2>
        <p className="text-muted text-sm">
          Tap a cuisine to quickly filter recipes.
        </p>
      </div>

      {/* Mobile: horizontal scrollable chips like Quick Filter */}
      <div className="sm:hidden px-4">
        <div className="flex gap-3 overflow-x-auto py-2">
          {featuredAreas.map((area) => (
            <Link
              to={`search/${area}`}
              key={area}
              onClick={() => filterByArea(area)}
              aria-label={`Filter by ${area}`}
              className="inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full card shadow-sm text-sm font-semibold text-accent hover:scale-105 transition"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: grid tiles like Quick Filter */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {featuredAreas.map((area) => (
          <Link
            to={`search/${area}`}
            key={area}
            onClick={() => filterByArea(area)}
            aria-label={`Filter by ${area}`}
            className="card p-4 rounded-xl shadow-md transition duration-300 text-center font-semibold hover:scale-[1.03] hover:ring-2 hover:ring-accent/20"
          >
            {area}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Cuisine;
