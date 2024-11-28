"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to dynamically return menu classes
  function getMenuClasses() {
    return isOpen
      ? "flex absolute top-[60px] w-full bg-pink-800 p-6 gap-10 flex-col left-0"
      : "hidden md:flex";  // Use `hidden` when menu is closed
  }

  return (
    <nav className="bg-pink-800 text-white p-4 sm:p-6 md:flex md:justify-between">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Animal Classifier</Link>
        
        {/* Menu that shows/hides based on isOpen */}
        <div className={getMenuClasses()}>
          <Link href="" className="mx-2 hover:text-gray-300">Dashboard</Link>
          <Link href="/my_image" className="mx-2 hover:text-gray-300">My Images</Link>
          <Link href="/sign-in" className="mx-2 hover:text-gray-300">Sign in</Link>
        </div>
        
        {/* Hamburger button for mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400"
            onClick={() => setIsOpen(!isOpen)} // Toggle menu open/close
          >
            {isOpen ? (
              <X className="h-6 w-6" /> // Close (X) icon
            ) : (
              <Menu className="h-6 w-6" /> // Hamburger menu icon
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
