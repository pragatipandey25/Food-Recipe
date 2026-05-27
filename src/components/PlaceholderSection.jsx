import React from "react";

const PlaceholderSection = ({ title, subtitle }) => {
  return (
    <section className="bg-transparent p-4 rounded-md">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {subtitle && <p className="text-muted">{subtitle}</p>}
      </div>
    </section>
  );
};

export default PlaceholderSection;
