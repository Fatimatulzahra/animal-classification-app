"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PawPrint, Dog, Cat } from "lucide-react";

const items = [
  { label: "Home", link: "/", icon: Dog },
  { label: "My Images", link: "/my_image", icon: Cat },
];

export const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true); // Ensures components relying on client-side data only render after mount
  }, []);

  if (!isMounted) return null; // Avoid rendering until client mounts

  return (
    <ClerkLoaded>
      <div className="sticky top-0 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-green-600 text-white shadow-lg z-50">
        <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-5 lg:px-6">
          <div className="flex items-center">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-4 text-white hover:bg-white/20">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[300px] bg-gradient-to-br from-teal-600 to-green-700 text-white">
                  <div className="mt-6 flex flex-col gap-4">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.link}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                            pathname === item.link
                              ? "bg-white/20 text-white"
                              : "hover:bg-white/10 text-white/80"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Link href="/" className="flex items-center text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity">
              <PawPrint className="h-8 w-8 mr-2 animate-bounce" />
              <span className="tracking-normal">Animal Classifier</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "border-2 border-white/30 hover:border-white/50 transition-all",
                  },
                }}
              />
            </SignedIn>
          </div>
        </nav>
      </div>
    </ClerkLoaded>
  );
};
