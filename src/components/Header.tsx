"use client"; // Indicates that this component is client-side rendered

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Used to access the current pathname

// Logo component
const Logo = () => {
  // Get the current pathname
  const pathname = usePathname();

  // Safeguard against null pathname (e.g., during initial render or errors)
  if (!pathname) return null;

  // Extract the first part of the path (e.g., "/types") and the second part (e.g., recipe ID)
  const currentArea = pathname.split("/")[1];
  const recipeID = pathname.split("/")[2];

  // State for managing the search query entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Handle changes in the search input field
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Ensure the search query is only one character long
    if (searchQuery.length === 1) {
      // Redirect to the search results page with the first-letter query
      window.location.href = `/search?f=${searchQuery}`;
    } else {
      // Show an alert if the input length is invalid
      alert("Please enter only one letter to search recipes.");
    }
  };

  // Determine whether to display the search bar
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

      {/* Center: Search Bar (only displayed on /types or related pages) */}
      {shouldDisplaySearchBar && (
        <div className="flex-grow flex justify-center">
          <form onSubmit={handleSearchSubmit} className="flex items-center max-w-lg w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by first letter..."
              maxLength={2} // Limit input to a maximum of two characters
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
          //navigation to types
          <Link
  className="bg-yellow-500 text-white p-4 text-xs sm:text-lg rounded font-bold"
  href={recipeID ? `/types` : "/types"}
>
  Back to {recipeID ? `${currentArea} recipes` : "recipe types"}
</Link>

        </div>
      )}
    </div>
  );
};

export default Logo;
