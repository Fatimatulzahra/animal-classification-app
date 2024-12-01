"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, PawPrint } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to dynamically return menu classes
  function getMenuClasses() {
    return isOpen
      ? "flex flex-col items-center gap-6 absolute top-[60px] left-0 w-full bg-gradient-to-b from-pink-800 to-pink-700 p-6 z-40"
      : "hidden md:flex md:items-center md:gap-8";  // Use 'hidden' when menu is closed
  }

  // Close the menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Automatically close the dropdown on larger screens
      }
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-pink-700 via-pink-800 to-pink-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex px-6 py-4 justify-between items-center">
        <Link href="/" className="flex items-center text-2xl font-bold tracking-wider hover:text-gray-300 transition">
          <PawPrint className="h-8 w-8 inline-block" /> Animal Classifier
        </Link>
        
        {/* Menu that shows/hides based on isOpen */}
        <div className={getMenuClasses()}>
          <Link href="/" className="text-lg font-medium hover:text-gray-300 transition duration-300">Home</Link>
          
          {/* Conditionally render 'My Images' link only for signed-in users */}
          <SignedIn>
            <Link href="/my_image" className="text-lg font-medium hover:text-gray-300 transition duration-300">
              My Images
            </Link>
          </SignedIn>
          
          {/* Render SignInButton when the user is signed out */}
          <SignedOut>
            <SignInButton />
          </SignedOut>

          {/* User Button for signed-in users */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Hamburger button for mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="md:hidden p-2 text-white rounded-md outline-none focus:ring-2 focus:ring-gray-300 transition"
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
