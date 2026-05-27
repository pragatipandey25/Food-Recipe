import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube, X, Heart } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[rgba(255,122,48,0.14)] bg-[linear-gradient(180deg,rgba(43,43,43,0.98),rgba(30,30,30,0.98))] text-[#F5F5F5]">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-black tracking-wide text-white">
              Pro<span className="text-(--primary)">Chef</span>
            </h3>
            <p className="text-sm mt-3 text-[rgba(245,245,245,0.72)] max-w-sm leading-6">
              Discover warm, modern recipe inspiration with curated dishes,
              quick meals, and a clean guest-first experience.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgba(245,245,245,0.8)] mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link
                className="text-[rgba(245,245,245,0.75)] hover:text-white transition"
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-[rgba(245,245,245,0.75)] hover:text-white transition"
                to="/favorites"
              >
                My Favorites
              </Link>
              <Link
                className="text-[rgba(245,245,245,0.75)] hover:text-white transition"
                to="/search/Chicken"
              >
                Search Recipes
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgba(245,245,245,0.8)] mb-4">
              Follow
            </h4>
            <div className="flex items-center gap-3">
              <SocialIcon
                label="Instagram"
                href="#"
                icon={<Instagram className="w-4 h-4" />}
              />
              <SocialIcon label="X" href="#" icon={<X className="w-4 h-4" />} />
              <SocialIcon
                label="YouTube"
                href="#"
                icon={<Youtube className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[rgba(245,245,245,0.62)]">
          <p>© {year} ProChef. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-(--primary)" />
            <span>Made for food lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    title={label}
    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-white transition hover:-translate-y-0.5 hover:border-[rgba(255,122,48,0.3)] hover:bg-[rgba(255,122,48,0.12)]"
  >
    {icon}
  </a>
);

export default Footer;
