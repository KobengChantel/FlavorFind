"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link component

export default function SearchPage() {
  const searchParams = useSearchParams();
  const firstLetter = searchParams.get("f");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      } finally {
        setLoading(false);
      }
    }

    if (firstLetter) fetchMeals();
  }, [firstLetter]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Meals Starting with "{firstLetter.toUpperCase()}"
      </h1>
      {meals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="border p-3 rounded-md">
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width={200}
                height={200}
                className="rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              <Link
                href={`/types/${meal.strCategory}/${meal.idMeal}`}
                className="text-blue-500"
              >
                View Recipe
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No meals found for "{firstLetter}".</div>
      )}
    </div>
  );
}
