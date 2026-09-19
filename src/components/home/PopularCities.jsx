// src/components/home/PopularCities.jsx
"use client";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PopularCities() {
  // Curated list with high-quality architecture/cityscape stock image fallbacks
  const cities = [
    {
      name: "Dhaka",
      propertiesCount: "1,240+ Properties",
      image:
        "https://images.unsplash.com/photo-1630987871777-f7b2d62894d0?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Khulna",
      propertiesCount: "450+ Properties",
      image:
        "https://images.unsplash.com/photo-1694712282542-1c9929653496?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Chattogram",
      propertiesCount: "820+ Properties",
      image:
        "https://images.unsplash.com/photo-1622760219088-90c1576336a1?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Rajshahi",
      propertiesCount: "310+ Properties",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Sylhet",
      propertiesCount: "640+ Properties",
      image:
        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Barishal",
      propertiesCount: "190+ Properties",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-24 bg-background">
      {/* Title Block aligning with Home Page typography */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Explore Top Locations
          </h2>
          <p className="text-gray-500 text-sm">
            Find premium stays and secure rentals in your favorite destination
            neighborhoods.
          </p>
        </div>
        <Link
          href="/properties"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0 group flex items-center gap-1">
          Browse All Cities
          <span className="transform group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Link>
      </div>

      {/* Grid Layout Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city, idx) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group relative h-72 rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg transition-all">
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-gray-100 overflow-hidden">
              <Image
                src={city.image}
                alt={`${city.name} Cityscape`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                width={300}
                height={300}
              />
              {/* Sleek Gradient Overlay for dynamic contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Top Badge Action */}
            <div className="absolute top-4 right-4 p-2.5 rounded-full bg-background/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight className="size-4" />
            </div>

            {/* Bottom Content Alignment */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col justify-end">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MapPin className="size-4 text-blue-400 shrink-0" />
                <h3 className="text-xl font-bold tracking-wide">{city.name}</h3>
              </div>
              <p className="text-xs text-gray-300 font-medium pl-5">
                {city.propertiesCount}
              </p>
            </div>

            {/* Fully accessible router link anchor overlay */}
            <Link
              href={`/properties?location=${encodeURIComponent(city.name)}`}
              className="absolute inset-0 z-10 cursor-pointer"
              aria-label={`View available rental properties in ${city.name}`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
