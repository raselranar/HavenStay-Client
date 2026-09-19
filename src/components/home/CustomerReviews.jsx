// src/components/home/CustomerReviews.jsx
"use client";
import { motion } from "framer-motion";

export default function CustomerReviews() {
  const reviews = [
    {
      author: "John Doe",
      message: "Amazing booking experience and verified properties.",
      rating: 5,
    },
    {
      author: "Jane Smith",
      message: "The listings are clean, easy to browse, and great value.",
      rating: 5,
    },
    {
      author: "Alex Turner",
      message: "Fast support and smooth checkout. Highly recommended!",
      rating: 5,
    },
    {
      author: "Emily Davis",
      message: "A fantastic platform for finding verified stays. Love it!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h2 className="text-3xl font-semibold text-slate-900">
          Customer Reviews
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid gap-6 md:grid-cols-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-background p-6 shadow-sm border border-slate-200">
            <div className="mb-5 flex items-center gap-1 text-amber-400 text-xl">
              {Array.from({ length: review.rating }).map((_, starIndex) => (
                <span key={starIndex}>★</span>
              ))}
            </div>
            <p className="text-sm text-slate-600 mb-6">{review.message}</p>
            <p className="text-sm font-semibold text-slate-900">
              {review.author}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
