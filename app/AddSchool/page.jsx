"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router=useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      setIsSubmitting(true);

      // Upload image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imageResponse = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imageResponse.data.success) {
        // Add school data
        const schoolData = {
          ...data,
          image: imageResponse.data.imagePath,
        };
        const schoolResponse = await axios.post("/api/schools", schoolData);
        if (schoolResponse.data.success) {
          toast.success("School Added Successfully...")
          router.push("/ShowSchool")
          reset();
        } else {
          setError("Failed to add school: " + schoolResponse.data.error);
        }
      } else {
        setError("Image upload failed: " + imageResponse.data.error);
      }
    } catch (error) {
      console.error(error);
      setError(
        "An error occurred: " + (error.response?.data?.error || error.message)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-indigo-400 via-white to-cyan-300 py-8">
      <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-100 to-white shadow-lg rounded-lg">
        <Link
          href="/"
          className="inline-block mb-6 px-4 py-2 text-blue-600 font-medium border border-blue-200 rounded hover:bg-blue-300 transition duration-300"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Add a School
        </h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              School Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                {...register("state", { required: "State is required" })}
                className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="tel"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Contact must be 10 digits",
                },
              })}
              className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email_id", { required: "Email is required" })}
              className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="mt-1 border border-gray-300 p-2 w-full rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
