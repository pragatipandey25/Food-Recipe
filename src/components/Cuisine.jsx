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
    <div className="cuisine-bar shadow-inner">
      <div className="cuisine-inner overflow-x-auto cuisine-scroll">
        <div className="flex space-x-4 py-3 items-center">
          <div className="cuisine-title text-lg font-bold text-yellow-400 pr-3 whitespace-nowrap">
            <Globe className="w-5 h-5 mr-2" />
            Global Cuisines:
          </div>
          {featuredAreas.map((area) => (
            <Link
              to={`search/${area}`}
              onClick={() => filterByArea(area)}
              key={area}
              className="cuisine-chip"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cuisine;
