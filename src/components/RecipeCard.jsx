import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal, compact = false }) => {
  // console.log("my meal = ",meal)
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className={`card group ${compact ? "mb-5" : ""}`}>
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[rgba(251,146,60,0.12)] transition duration-500"></div>

        <div
          className={`flex justify-center items-center ${compact ? "p-5" : "p-5"}`}
        >
          <img
            src={meal?.strMealThumb}
            alt=""
            className={`recipe-img ${compact ? "compact" : "large"} border border-[rgba(250,235,215,0.12)] transition duration-500 group-hover:scale-105`}
          />
        </div>
        {!compact && (
          <div className="p-2 text-center">
            <h3
              className="text-xl pb-3 font-bold mb-1"
              style={{ color: "var(--text)" }}
            >
              {meal.strMeal}
            </h3>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
