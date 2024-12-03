"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PawPrint, Dog, Cat } from "lucide-react";

const items = [
  { label: "Home", link: "/", icon: Dog },
  { label: "My Images", link: "/my_image", icon: Cat },
];

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 text-white shadow-lg z-50">
      <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-5 lg:px-6">
        {/* Left section - Logo + Menu Button */}
        <div className="flex items-center">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 text-white hover:bg-white/20"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] bg-gradient-to-br from-teal-600 to-green-700 text-white"
              >
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center text-2xl font-bold tracking-wider mb-4">
                    <PawPrint className="h-8 w-8 mr-2" />
                    <span className="tracking-normal">Animal Classifier</span>
                  </div>
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <React.Fragment key={item.label}>
                        {item.label === "My Images" ? (
                          <SignedIn>
                            <Link
                              href={item.link}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                                pathname === item.link
                                  ? "bg-white/20 text-white"
                                  : "hover:bg-white/10 text-white/80"
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              <Icon className="h-5 w-5" />
                              {item.label}
                            </Link>
                          </SignedIn>
                        ) : (
                          <Link
                            href={item.link}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                              pathname === item.link
                                ? "bg-white/20 text-white"
                                : "hover:bg-white/10 text-white/80"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Link>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Responsive Logo */}
          <Link
            href="/"
            className="flex items-center text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity"
          >
            <PawPrint className="h-8 w-8 mr-2 animate-bounce" />
            <span className="tracking-normal">Animal Classifier</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-8 md:flex md:gap-6">
          {items.map((item) =>
            item.label === "My Images" ? (
              <SignedIn key={item.label}>
                <NavItem href={item.link} isActive={pathname === item.link}>
                  {item.label}
                </NavItem>
              </SignedIn>
            ) : (
              <NavItem
                key={item.label}
                href={item.link}
                isActive={pathname === item.link}
              >
                {item.label}
              </NavItem>
            )
          )}

          </div>
        </div>

        {/* Right section - User */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "border-2 border-white/30 hover:border-white/50 transition-all",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

const NavItem = ({ href, children, isActive }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 rounded-lg transition-all group",
        isActive
          ? "bg-white/20 text-white"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <span className="absolute inset-0 rounded-lg bg-white/20 -z-10 animate-pulse" />
      )}
    </Link>
  );
};
