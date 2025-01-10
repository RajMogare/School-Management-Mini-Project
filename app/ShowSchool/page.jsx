"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("school data", schools);
  useEffect(() => {
    fetch("/api/schools")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSchools(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div  className=" px-4 py-8 bg-gradient-to-br from-gray-300 via-white to-gray-400 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-800">
          List of Schools
        </h1>
        <Link
          href="/"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Go to Home
        </Link>

        {schools.length === 0 ? (
          <p className="text-center mt-9 text-gray-700">No schools found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={`/schoolImages/${school.image}`}
                  alt={school.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=192&width=384";
                  }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Name: {school.name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Address: {school.address}
                  </p>
                  <p className="text-gray-600">City: {school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
