"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();

  // Safeguard against null pathname
  if (!pathname) return null;

  const currentArea = pathname.split("/")[1];
  const recipeID = pathname.split("/")[2];
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length === 1) {
      // Redirect to search results page with the first-letter query
      window.location.href = `/search?f=${searchQuery}`;
    } else {
      alert("Please enter only one letter to search recipes.");
    }
  };

  // Check if we're on the "/types" path or any related subpath
  const shouldDisplaySearchBar = pathname.startsWith("/types/");

  return (
    <div className="py-5 px-2 sm:px-10 bg-slate-300 flex items-center justify-between">
      {/* Left side: Logo */}
      <div>
        <Link href="/">
          <h1 className="text-purple text-pink-700 font-bold text-5xl text-center">
            FlavorFind
          </h1>
        </Link>
      </div>

      {/* Center: Search Bar (only displayed if on /types or related pages) */}
      {shouldDisplaySearchBar && (
        <div className="flex-grow flex justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center max-w-lg w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by first letter..."
              maxLength={2} // Limit input to a single character
              className="p-2 rounded-l-md border border-gray-300 w-full"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white p-2 rounded-r-md border border-gray-300"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Right side: "Back to" Link */}
      {currentArea && (
        <div>
          <Link
            className="bg-yellow-500 text-white p-4 text-xs sm:text-lg rounded font-bold"
            href={recipeID ? `/types/${currentArea}` : "/types/"}
          >
            Back to {recipeID ? `${currentArea} recipes` : "recipe types"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Logo;
