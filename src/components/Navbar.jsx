"use client";
import Link from "next/link";
import NavLink from "./ui/NavLink";
import AuthButtons from "./ui/AuthButtons";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar({ session = null }) {
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const prevPath = useRef(path);

  useEffect(() => {
    if (prevPath.current !== path) {
      setOpen(false);
      prevPath.current = path;
    }
  }, [path]);

  if (path && path.includes("/dashboard")) {
    return null; // Don't render the navbar on dashboard pages
  }

  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "All Properties",
      url: "/properties",
    },
  ];

  const protectedLinks = [
    {
      label: "Dashboard",
      url: "/dashboard",
    },
  ];

  if (session) {
    links.push(...protectedLinks);
  }

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary">
          HavenStay
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {links.map((link) => (
            <li
              key={link.label}
              className={"*:hover:text-primary transition-colors px-1 py-px"}>
              <NavLink
                href={link.url}
                activeClass="text-primary border-b-2 border-primary">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:block">
          <AuthButtons session={session} />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            className="p-2 rounded-md hover:bg-gray-100 transition">
            {!open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="md:hidden">
          <div className="border-t bg-background/95 backdrop-blur-md">
            <ul className="flex flex-col p-4 gap-3 text-sm font-medium text-gray-700">
              {links.map((link) => (
                <li key={link.label} className="transition-colors">
                  <NavLink
                    href={link.url}
                    onClick={() => setOpen(false)}
                    activeClass="text-primary">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-4">
              <AuthButtons session={session} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
