"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreVerticalIcon, UserIcon, XIcon } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "./all-destination" },
  { label: "Add Destinations", href: "./add-destination" },
  { label: "My Bookings", href: "#" },
  // { label: "Admin", href: "#" },
];

const accountLinks = [
  { label: "Profile", href: "#" },
  { label: "Login", href: "#" },
  { label: "Sign Up", href: "#" },
];

// Top navigation bar: links on the left, logo in the middle, account links on
// the right. On phones/tablets all links move into the three-dot menu.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className=" flex items-center justify-between bg-white px-6 py-3 shadow-sm sticky top-0 z-50">
      {/* Left: main navigation links (desktop only) */}
      <nav className="hidden items-center gap-6 text-sm lg:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={
              link.active
                ? "font-medium text-cyan-600"
                : "text-gray-700 hover:text-cyan-600"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Logo: centered on desktop, on the left in mobile view */}
      <Image
        src="/images/Wanderlast.png"
        alt="Wanderlast"
        width={162}
        height={24}
        className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
      />

      {/* Right: account links (desktop only) */}
      <div className="hidden items-center gap-5 text-sm text-gray-700 lg:flex">
        {accountLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 hover:text-cyan-600"
          >
            {link.label === "Profile" && <UserIcon className="h-4 w-4" />}
            {link.label}
          </Link>
        ))}
      </div>

      {/* Three-dot button (mobile/tablet only) */}
      <button
        type="button"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded p-1 text-gray-700 hover:bg-gray-100 lg:hidden"
      >
        {menuOpen ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MoreVerticalIcon className="h-5 w-5" />
        )}
      </button>

      {/* Dropdown menu opened by the three-dot button */}
      {menuOpen && (
        <div className="absolute right-4 top-full z-50 mt-2 w-52 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 text-sm hover:bg-gray-50 ${link.active ? "font-medium text-cyan-600" : "text-gray-700"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t" />
          {accountLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
